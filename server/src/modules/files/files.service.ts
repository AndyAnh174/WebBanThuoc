import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface FileUploadResult {
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  bucket: string;
  path: string;
  publicUrl: string;
  privateUrl: string;
}

export interface FileUploadOptions {
  folder?: string;
  isPublic?: boolean;
  allowedMimeTypes?: string[];
  maxSizeBytes?: number;
}

// Default allowed file types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
];

// Max file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

@Injectable()
export class FilesService implements OnModuleInit {
  private minioClient: Minio.Client;
  private bucket: string;
  private publicUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT', 'localhost'),
      port: this.configService.get<number>('MINIO_PORT', 9000),
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ROOT_USER', 'minioadmin'),
      secretKey: this.configService.get<string>('MINIO_ROOT_PASSWORD', 'minioadmin123'),
    });

    this.bucket = this.configService.get<string>('AWS_S3_BUCKET', 'webbanthuoc-bucket');
    this.publicUrl = this.configService.get<string>(
      'MINIO_PUBLIC_URL',
      `http://${this.configService.get('MINIO_ENDPOINT', 'localhost')}:${this.configService.get('MINIO_PORT', 9000)}`,
    );
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  /**
   * Đảm bảo bucket tồn tại, tạo mới nếu chưa có
   */
  private async ensureBucketExists(): Promise<void> {
    try {
      const exists = await this.minioClient.bucketExists(this.bucket);
      if (!exists) {
        await this.minioClient.makeBucket(this.bucket, 'us-east-1');
        console.log(`Bucket "${this.bucket}" created successfully`);

        // Set bucket policy để public read (optional)
        const policy = {
          Version: '2012-10-17',
          Statement: [
            {
              Effect: 'Allow',
              Principal: { AWS: ['*'] },
              Action: ['s3:GetObject'],
              Resource: [`arn:aws:s3:::${this.bucket}/public/*`],
            },
          ],
        };
        await this.minioClient.setBucketPolicy(this.bucket, JSON.stringify(policy));
        console.log(`Bucket policy set for public folder`);
      }
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
      // Không throw error ở đây để app vẫn start được
    }
  }

  /**
   * Validate file trước khi upload
   */
  private validateFile(
    file: UploadedFile,
    options: FileUploadOptions = {},
  ): void {
    const allowedMimeTypes = options.allowedMimeTypes || ALLOWED_MIME_TYPES;
    const maxSize = options.maxSizeBytes || MAX_FILE_SIZE;

    // Validate mime type
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type "${file.mimetype}" is not allowed. Allowed types: ${allowedMimeTypes.join(', ')}`,
      );
    }

    // Validate file size
    if (file.size > maxSize) {
      const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
      throw new BadRequestException(
        `File size exceeds the maximum limit of ${maxSizeMB}MB`,
      );
    }
  }

  /**
   * Generate unique file name
   */
  private generateFileName(originalName: string): string {
    const ext = path.extname(originalName).toLowerCase();
    const timestamp = Date.now();
    const uuid = uuidv4().slice(0, 8);
    return `${timestamp}-${uuid}${ext}`;
  }

  /**
   * Upload single file to MinIO
   */
  async uploadFile(
    file: UploadedFile,
    options: FileUploadOptions = {},
  ): Promise<FileUploadResult> {
    // Validate file
    this.validateFile(file, options);

    const folder = options.folder || (options.isPublic ? 'public' : 'private');
    const fileName = this.generateFileName(file.originalname);
    const objectPath = `${folder}/${fileName}`;

    try {
      // Upload to MinIO
      const stream = Readable.from(file.buffer);
      await this.minioClient.putObject(
        this.bucket,
        objectPath,
        stream,
        file.size,
        {
          'Content-Type': file.mimetype,
          'x-amz-meta-original-name': encodeURIComponent(file.originalname),
        },
      );

      // Generate URLs
      const publicUrl = `${this.publicUrl}/${this.bucket}/${objectPath}`;
      const privateUrl = await this.getPresignedUrl(objectPath);

      return {
        fileName,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        bucket: this.bucket,
        path: objectPath,
        publicUrl,
        privateUrl,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(
    files: UploadedFile[],
    options: FileUploadOptions = {},
  ): Promise<FileUploadResult[]> {
    const results: FileUploadResult[] = [];

    for (const file of files) {
      const result = await this.uploadFile(file, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Get presigned URL for private file access
   * URL có hiệu lực trong 1 giờ
   */
  async getPresignedUrl(objectPath: string, expirySeconds = 3600): Promise<string> {
    try {
      return await this.minioClient.presignedGetObject(
        this.bucket,
        objectPath,
        expirySeconds,
      );
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw new InternalServerErrorException('Failed to generate file URL');
    }
  }

  /**
   * Get public URL for files in public folder
   */
  getPublicUrl(objectPath: string): string {
    return `${this.publicUrl}/${this.bucket}/${objectPath}`;
  }

  /**
   * Delete file from MinIO
   */
  async deleteFile(objectPath: string): Promise<void> {
    try {
      await this.minioClient.removeObject(this.bucket, objectPath);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  /**
   * Check if file exists
   */
  async fileExists(objectPath: string): Promise<boolean> {
    try {
      await this.minioClient.statObject(this.bucket, objectPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get file info
   */
  async getFileInfo(objectPath: string): Promise<Minio.BucketItemStat | null> {
    try {
      return await this.minioClient.statObject(this.bucket, objectPath);
    } catch {
      return null;
    }
  }
}
