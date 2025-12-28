import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma';
import { FilesModule } from './modules/files';
import { AuthModule } from './modules/auth';
import { ProductsModule } from './modules/products';
import {
  appConfig,
  databaseConfig,
  minioConfig,
  redisConfig,
  jwtConfig,
} from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [appConfig, databaseConfig, minioConfig, redisConfig, jwtConfig],
    }),
    PrismaModule,
    FilesModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
