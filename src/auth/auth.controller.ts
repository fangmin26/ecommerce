import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RequestWithUserInterface } from "./requestWithUser.interface";
import { LocalAuthGuard } from "./guard/localAuth.guard";
import {Response} from "express";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { ConfirmEmailDto } from "../user/dto/confirm-email.dto";
import { ConfirmAuthenticate } from "src/user/dto/confirm-authenticate.dto";
import { FacebookAuthGuard } from "./guard/facebookAuth.guard";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiCreatedResponse({
    description:'the record has been seccuess',
    type:User
  })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto){
    const user = await this.authService.signup(createUserDto)
    await this.authService.sendVerificationLink(createUserDto.email)
    return user;
  }

  @Post('email/confirm')
  async confirm(@Body() confirmationDto: ConfirmEmailDto){
    const email = await this.authService.decodedConfirmationToken(confirmationDto.token)
    await this.authService.confirmEmail(email)
    return 'success'
  }


  @UseGuards(LocalAuthGuard)
  @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto ){
  //   // const loggedUser = await this.authService.getAuthicatedUser(loginUserDto.email, loginUserDto.password)
  //   //return loggedUser;
  // }
  async login(@Req() request: RequestWithUserInterface, @Res() response: Response){
    const user = request.user //로그인한 상대는 유저
    const token = await this.authService.generateJWT(user.id)
    // return user;
    return response.send({
      user, token
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: RequestWithUserInterface){
    const {user} = request
    return user;

  }

  @Post('check') //본인인증 //boot pay docs 본인인증 2-1 (서버사이드 ) /1-1은 클라이언트
   async checkAuthenticate() {
    return await this.authService.checkAuth()
   }

   @Post('confirm/authenticate')
   async confirmAuthenticate(@Body() confirmAuthenticateDto: ConfirmAuthenticate) {
    return await this.authService.authenticateConfirm(confirmAuthenticateDto)
   }

   @Get("/facebook")
   @UseGuards(FacebookAuthGuard)
   async facebookLogin(): Promise<any> {
     return HttpStatus.OK;
   }
 
   @Get("/facebook/callback")
   @UseGuards(FacebookAuthGuard)
   async facebookLoginRedirect(@Req() req: Request): Promise<any> {
     return {
      //  statusCode: HttpStatus.OK,

     };
   }
}
