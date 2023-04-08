import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from '@database/database.module';
import { ProductModule } from '@product/product.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import * as Joi from "@hapi/joi";//유성 검사
import { TerminusModule } from '@nestjs/terminus';
import { EmailModule } from '@email/email.module'; //절대경로 잡아주는것 //front도 적용 
import { ProfileModule } from '@profile/profile.module';
import { FilesModule } from '@files/files.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CommentModule } from './comment/comment.module';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { LibraryModule } from './library/library.module';
import * as cors from 'cors';

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

        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
        
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),

        JWT_VERIFICATION_TOKEN_SECRET_PASSWORD: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME_PASSWORD: Joi.string().required(),
        PASSWORD_CONFIRMATION_URL: Joi.string().required(),

        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),

        FACEBOOK_CLIENT_ID:Joi.string().required(),
        FACEBOOK_CLIENT_SECRET:Joi.string().required(),

        GOOGLE_CLIENT_ID:Joi.string().required(),
        GOOGLE_CLIENT_SECRET:Joi.string().required(),

        NAVER_CLIENT_ID:Joi.string().required(),
        NAVER_CLIENT_SECRET:Joi.string().required(),

        KAKAO_CLIENT_ID:Joi.string().required(),
        KAKAO_CALLBACK_URL:Joi.string().required(),

        AWS_REGION:Joi.string().required(),
        AWS_ACCESS_KEY_ID:Joi.string().required(),
        ASW_SECRET_ACCESS_KEY:Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME:Joi.string().required(),

        REDIS_HOST: Joi.string().required(),
        REDIS_PORT:Joi.number().required(),
        // REDIS_USERNAME: Joi.string().required(),
        // REDIS_PASSWORD: Joi.string().required(),
        REDIS_TTL: Joi.number().required(), //제한시간

        LIBRARY_ADDRESS: Joi.string().required()
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
    ScheduleModule.forRoot(),
    CommentModule,
    RedisCacheModule,
    LibraryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// export class AppModule implements NestModule{
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(cors({
//         origin: 'http://localhost:3000', // 클라이언트 도메인
//         credentials: true, // 쿠키를 전송할 수 있도록 설정
//       }))
//       .forRoutes('*');
//     }
//   }
