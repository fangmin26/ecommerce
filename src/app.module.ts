import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as Joi from "@hapi/joi";//유성 검사
import { TerminusModule } from '@nestjs/terminus';
// import { EmailModule } from './email/email.module';
import { EmailModule } from '@email/email.module'; //절대경로 잡아주는것 //front도 적용 
import { ProfileModule } from './profile/profile.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    validationSchema: Joi.object(({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),

        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),

        FACEBOOK_CLIENT_ID:Joi.string().required(),
        FACEBOOK_CLIENT_SECRET:Joi.string().required(),

        GOOGLE_CLIENT_ID:Joi.string().required(),
        GOOGLE_CLIENT_SECRET:Joi.string().required(),

        AWS_REGION:Joi.string().required(),
        AWS_ACCESS_KEY_ID:Joi.string().required(),
        ASW_SECRET_ACCESS_KEY:Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME:Joi.string().required()

      }))
    }),
    DatabaseModule,
    ProductModule,
    UserModule,
    AuthModule,
    EmailModule,
    TerminusModule,
    ProfileModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
