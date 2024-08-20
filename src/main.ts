import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as dotenv from "dotenv"
dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true
  // }));

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONTEND_URL, // CORS cho phép từ origin cụ thể
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use('/upload', express.static(join(process.cwd(), 'upload')));

  const port = process.env.PORTP; // Sử dụng cổng từ biến môi trường hoặc 3333 nếu không có
  await app.listen(port);
}

bootstrap();
