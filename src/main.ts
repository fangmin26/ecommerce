import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem') //에러 생김 : 파일 위치 문제였음 ^^;
  }

  const app = await NestFactory.create(AppModule, {httpsOptions});
  app.useGlobalPipes(new ValidationPipe({skipMissingProperties: true}))
  await app.listen(3000);
}
bootstrap();
