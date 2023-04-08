import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/transfor.interceptor';
import {config} from 'aws-sdk'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector)
  ))

  const docubuilder = new DocumentBuilder()
  .setTitle('bookdiz_back')
  .setDescription('cloudfunding_rebuilding')
  .setVersion('1.0')
  .addTag('clound funding rebuilding backend project')
  .build()

  const document = SwaggerModule.createDocument(app,docubuilder)
  SwaggerModule.setup('api',app, document)
  
  app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true,transform:true}))
  const configService = app.get(ConfigService);//credential오류시 확인
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('ASW_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION')
  })
  await app.listen(8000);
  // await app.listen(443);  //https
  // await app.listen(80); //http
}
bootstrap();
