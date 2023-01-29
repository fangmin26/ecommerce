import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./tokenPayload.interface";
import { EmailService } from "../email/email.service";
import { VerificationTokenPayloadInterface } from "./VerificationTokenPayload.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    try {
      return await  this.userService.create(createUserDto)
    }catch (error) {
      throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
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

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`
    const text = `welcom ${url}`
    return this.emailService.sendMail({
      to:email,
      subject:'email confirnation',
      text
    })
  }
}
