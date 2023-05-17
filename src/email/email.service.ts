import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      // host: 'smtp.gmail.com',
      // port: 587,
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
  //이메일 - 인증코드
  //1.메일 전송(body)
  //2.인증코드 생성
  //3.redis에 저장(키값은 이메일)
  //4.카운트다운(ttl에 3분으로 제한, 프론트 - 카운트다운 라이브러리)
}
