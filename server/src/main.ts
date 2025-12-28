import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ properties không có trong DTO
      forbidNonWhitelisted: true, // Báo lỗi nếu có properties không hợp lệ
      transform: true, // Tự động transform types
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS
  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('WebBanThuoc API')
    .setDescription(
      `
## 💊 Website Bán Dược Phẩm API Documentation

### Authentication
API sử dụng JWT Bearer Token để xác thực.
- Đăng nhập qua \`POST /auth/login\` để lấy Access Token
- Thêm token vào header: \`Authorization: Bearer <access_token>\`

### Trạng thái tài khoản
- **PENDING**: Chờ admin duyệt
- **ACTIVE**: Đã được duyệt, có thể đăng nhập
- **REJECTED**: Bị từ chối
- **LOCKED**: Bị khóa

### Roles
- **ADMIN**: Quản trị viên
- **CUSTOMER**: Khách hàng
      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Nhập JWT token',
        in: 'header',
      },
      'JWT-auth', // Security name reference
    )
    .addTag('Auth', 'Xác thực và phân quyền')
    .addTag('Files', 'Upload và quản lý file')
    .addTag('Products', 'Quản lý sản phẩm')
    .addTag('Categories', 'Quản lý danh mục')
    .addTag('Orders', 'Quản lý đơn hàng')
    .addTag('Users', 'Quản lý người dùng')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'WebBanThuoc API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT ?? 3001}`);
  console.log(`📚 Swagger docs at http://localhost:${process.env.PORT ?? 3001}/api/docs`);
}
bootstrap();
