import {
  Controller,
  Post,
  Delete,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FilesService, FileUploadResult } from './files.service';

// Max file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

// Allowed file types regex
const ALLOWED_FILE_TYPES = /^(image\/(jpeg|jpg|png|gif|webp)|application\/pdf)$/;

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  /**
   * Upload single file
   * POST /files/upload
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
          new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Query('folder') folder?: string,
    @Query('isPublic') isPublic?: string,
  ): Promise<FileUploadResult> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.filesService.uploadFile(
      {
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        buffer: file.buffer,
        size: file.size,
      },
      {
        folder,
        isPublic: isPublic === 'true',
      },
    );
  }

  /**
   * Upload multiple files (max 10)
   * POST /files/upload-multiple
   */
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('folder') folder?: string,
    @Query('isPublic') isPublic?: string,
  ): Promise<FileUploadResult[]> {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    const uploadedFiles = files.map((file) => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      buffer: file.buffer,
      size: file.size,
    }));

    return this.filesService.uploadFiles(uploadedFiles, {
      folder,
      isPublic: isPublic === 'true',
    });
  }

  /**
   * Get presigned URL for private file
   * GET /files/presigned-url?path=xxx
   */
  @Get('presigned-url')
  async getPresignedUrl(
    @Query('path') objectPath: string,
    @Query('expiry') expiry?: string,
  ): Promise<{ url: string; expiresIn: number }> {
    if (!objectPath) {
      throw new BadRequestException('File path is required');
    }

    const expirySeconds = expiry ? parseInt(expiry, 10) : 3600;
    const url = await this.filesService.getPresignedUrl(objectPath, expirySeconds);

    return {
      url,
      expiresIn: expirySeconds,
    };
  }

  /**
   * Delete file
   * DELETE /files?path=xxx
   */
  @Delete()
  async deleteFile(@Query('path') objectPath: string): Promise<{ success: boolean }> {
    if (!objectPath) {
      throw new BadRequestException('File path is required');
    }

    await this.filesService.deleteFile(objectPath);
    return { success: true };
  }

  /**
   * Check if file exists
   * GET /files/exists?path=xxx
   */
  @Get('exists')
  async fileExists(@Query('path') objectPath: string): Promise<{ exists: boolean }> {
    if (!objectPath) {
      throw new BadRequestException('File path is required');
    }

    const exists = await this.filesService.fileExists(objectPath);
    return { exists };
  }
}
