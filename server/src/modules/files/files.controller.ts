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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { FilesService, FileUploadResult } from './files.service';

// Max file size: 20MB
const MAX_FILE_SIZE = 20 * 1024 * 1024;

// Allowed file types regex
const ALLOWED_FILE_TYPES = /^(image\/(jpeg|jpg|png|gif|webp)|application\/pdf)$/;

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  /**
   * Upload single file
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: 'Upload file đơn',
    description: 'Upload một file lên MinIO storage. Hỗ trợ: JPEG, PNG, GIF, WEBP, PDF. Max: 20MB',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File cần upload',
        },
      },
    },
  })
  @ApiQuery({
    name: 'folder',
    required: false,
    description: 'Folder lưu file (default: public hoặc private)',
    example: 'products',
  })
  @ApiQuery({
    name: 'isPublic',
    required: false,
    description: 'File có public không',
    example: 'true',
  })
  @ApiResponse({
    status: 201,
    description: 'Upload thành công',
    schema: {
      example: {
        fileName: '1704067200000-abc12345.jpg',
        originalName: 'product.jpg',
        mimeType: 'image/jpeg',
        size: 102400,
        bucket: 'webbanthuoc-bucket',
        path: 'products/1704067200000-abc12345.jpg',
        publicUrl: 'http://localhost:9000/webbanthuoc-bucket/products/...',
        privateUrl: 'http://localhost:9000/webbanthuoc-bucket/products/...?token=...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'File không hợp lệ' })
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
   * Upload multiple files
   */
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiOperation({
    summary: 'Upload nhiều file',
    description: 'Upload tối đa 10 files cùng lúc',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['files'],
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Danh sách files (max 10)',
        },
      },
    },
  })
  @ApiQuery({ name: 'folder', required: false, description: 'Folder lưu files' })
  @ApiQuery({ name: 'isPublic', required: false, description: 'Files có public không' })
  @ApiResponse({ status: 201, description: 'Upload thành công' })
  @ApiResponse({ status: 400, description: 'Files không hợp lệ' })
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
   * Get presigned URL
   */
  @Get('presigned-url')
  @ApiOperation({
    summary: 'Lấy Presigned URL',
    description: 'Lấy URL tạm thời để truy cập file private',
  })
  @ApiQuery({
    name: 'path',
    required: true,
    description: 'Đường dẫn file',
    example: 'licenses/1704067200000-abc12345.pdf',
  })
  @ApiQuery({
    name: 'expiry',
    required: false,
    description: 'Thời gian hết hạn (giây)',
    example: '3600',
  })
  @ApiResponse({
    status: 200,
    description: 'Thành công',
    schema: {
      example: {
        url: 'http://localhost:9000/webbanthuoc-bucket/licenses/...?token=...',
        expiresIn: 3600,
      },
    },
  })
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
   */
  @Delete()
  @ApiOperation({
    summary: 'Xóa file',
    description: 'Xóa file khỏi storage',
  })
  @ApiQuery({
    name: 'path',
    required: true,
    description: 'Đường dẫn file cần xóa',
  })
  @ApiResponse({ status: 200, description: 'Xóa thành công' })
  @ApiResponse({ status: 400, description: 'Path không hợp lệ' })
  async deleteFile(@Query('path') objectPath: string): Promise<{ success: boolean }> {
    if (!objectPath) {
      throw new BadRequestException('File path is required');
    }

    await this.filesService.deleteFile(objectPath);
    return { success: true };
  }

  /**
   * Check if file exists
   */
  @Get('exists')
  @ApiOperation({
    summary: 'Kiểm tra file tồn tại',
    description: 'Kiểm tra xem file có tồn tại trong storage không',
  })
  @ApiQuery({
    name: 'path',
    required: true,
    description: 'Đường dẫn file cần kiểm tra',
  })
  @ApiResponse({
    status: 200,
    description: 'Kết quả kiểm tra',
    schema: {
      example: { exists: true },
    },
  })
  async fileExists(@Query('path') objectPath: string): Promise<{ exists: boolean }> {
    if (!objectPath) {
      throw new BadRequestException('File path is required');
    }

    const exists = await this.filesService.fileExists(objectPath);
    return { exists };
  }
}
