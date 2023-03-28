import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategy/local.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { FacebookAuthModule } from '@nestjs-hybrid-auth/facebook';
import { FacebookAuthConfig } from './strategy/facebook.auth.config';
import { GoogleAuthModule } from '@nestjs-hybrid-auth/google';
import { GoogleAuthConfig } from './strategy/google.auth.config';
import { EmailModule } from '@email/email.module';
import { UserModule } from '@user/user.module';
import {ThrottlerModule} from '@nestjs/throttler'
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({
      isGlobal:true,
      cache: true,
      expandVariables: true
    }),
    EmailModule,
    JwtModule.register({}), //service 모듈내부에서 적용을하려면 이렇게 적용
    // JwtModule.registerAsync({
    //   // imports: [ConfigModule],
    //   // inject: [ConfigService],
    //   // useFactory: async (configService: ConfigService) =>({
    //   //   secret: configService.get('JWT_SECRET'),
    //   //   signOptions: {
    //   //     expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}` //.env로 바로 하는 경우도 있는데, 매뉴얼적인 스타일
    //   //   }
    //   // })
    // }),
    FacebookAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: FacebookAuthConfig,
    }),
    GoogleAuthModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: GoogleAuthConfig
    }),
    ThrottlerModule.forRoot({
      ttl:200,
      limit: 2  //60초동안 10번만 할수 있음 - Ddos 공격에 대비 , bot 공격 대비 
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
