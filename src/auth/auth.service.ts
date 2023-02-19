import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from 'bcryptjs'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./tokenPayload.interface";
import { EmailService } from "../email/email.service";
import { VerificationTokenPayloadInterface } from "./VerificationTokenPayload.interface";
import Bootpay from "@bootpay/backend-js";
import { ConfirmAuthenticate } from "src/user/dto/confirm-authenticate.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,

  ) {}

  public async signup(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto)
      return await  this.userService.create(createUserDto)
    }catch (error) {
      throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async socialLogin(email: string, username: string,password: string ) {
    try {
      console.log(email)
      const user = await this.userService.getUserByEmail(email)
      if(!user){
        console.log("생성")
        const createUser = await this.signup({email,username,password})

        if(createUser){
          const authUser = await this.getAuthicatedUser(email, password)
          const token = await this.generateJWT(authUser.id)
          return {user:authUser,token}
  
        }else{
          throw new HttpException('회원가입 실패', HttpStatus.BAD_REQUEST)
        }
      }else{
        console.log("로그인")
        const token = this.generateJWT(user.id)
        return {user,token}
      }

    } catch (error) {
      console.log(error)
      throw new HttpException('something went wrong-social', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
  public async getAuthicatedUser(email: string, plainTextPassword:string) {
    try {
      const user = await this.userService.getByEmail(email)
      // password 암호화 풀기 - 디코딩
      await this.verifyPassword(plainTextPassword, user.password)
      return user;
    }catch (error){
      throw new HttpException('no user here', HttpStatus.BAD_REQUEST)
    }
  }

  private async  verifyPassword(plainTextPassword:string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword)
    if(!isPasswordMatching) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
    }
  }

  public generateJWT(userId: string){ //payload에 userId를 넣는다는 의미
    const payload: TokenPayload = { userId }
    const token = this.jwtService.sign(payload)
    return token
  }

  public sendEmail(email: string) {
    const mainText =  'mail test'
    return this.emailService.sendMail({
      from: "abc@naver.com",
      to: email,
      subject: 'email test',
      text:mainText
    })
  }

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayloadInterface = {email}
    const token = this.jwtService.sign(payload, { //생성
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
    })
    console.log(token)
    console.log(email)
    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`
    const text = `welcom ${url}`
    return this.emailService.sendMail({
      to:email,
      subject:'email confirnation',
      text
    })
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email)
    if(user.isEmailConfirmed){
      throw new BadRequestException('email is almost confirmed')
    }
    await this.userService.markEmailAsConfirmed(email)

  }

  public async decodedConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
      })
      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException()
    }catch (err){
      //만료됬을떄도 구현해볼것
      throw  new BadRequestException('bad confirmation token')
    }
  }

  public async checkAuth() {
    Bootpay.setConfiguration({ //실제적으로 받아야하는 key값 =>써드파티에서 제공이됌 유료임, 주신건 테스트용도로만 사용
      application_id: '63749a42d01c7e0021ea97b7',
      private_key:    '9JRNmdmCdE3uyplhZyXFHPaEzXbHFp5goGT1unHUXrs='
    }) //결제건수에 따라 금액 체계 다름
    try {
      await Bootpay.getAccessToken() 
      const response = await Bootpay.requestAuthentication({ //실제적 parameter
        pg:                '다날',
        method:            '본인인증',
        order_name:        '테스트 인증',
        authentication_id: (new Date()).getTime().toString(),
        username:          '황민지',
        identity_no:       '9102262',
        phone:             '01029693106',
        carrier:           'LGT',
        authenticate_type: 'sms'
      })
      console.log(response,"response")    
    } catch (error) {
      console.log(error)
    }
  }

  async authenticateConfirm(confirmAuthenticateDto: ConfirmAuthenticate){
    Bootpay.setConfiguration({
      application_id: '63749a42d01c7e0021ea97b7',
      private_key:    '9JRNmdmCdE3uyplhZyXFHPaEzXbHFp5goGT1unHUXrs='
    })
    try {
      await Bootpay.getAccessToken()
      const response = await Bootpay.confirmAuthentication(
          confirmAuthenticateDto.receipt_id,
          confirmAuthenticateDto.otp
      )
      console.log(response)
      if(response.status ===12){//인증 완ㅛ
        console.log(response.receipt_id)
        console.log(response.authenticate_data.phone)
        const authenticateData = response.authenticate_data
        this.userService.updateAuthenticationConfirm(authenticateData.phone,
          authenticateData.name, authenticateData.gender)
      }
  } catch (e) {
      // 발급 실패시 오류
      console.log(e)
  }
  }
}
