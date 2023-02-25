import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/transfor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalInterceptors(new TransformInterceptor())
  const config = new DocumentBuilder()
  .setTitle('exam')
  .setDescription('descrip')
  .setVersion('1.0')
  .addTag('ecomm')
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api',app, document)
  
  app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true}))
  await app.listen(3000);
  // await app.listen(443);  //https
  // await app.listen(80); //http
}
bootstrap();
