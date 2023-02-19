import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res, HttpStatus } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserService } from "src/user/user.service";
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
import { FacebookAuthResult, UseFacebookAuth } from "@nestjs-hybrid-auth/facebook";
import { GoogleAuthResult, UseGoogleAuth } from "@nestjs-hybrid-auth/google";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
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

   @UseFacebookAuth()
   @Get("facebook")
   loginWithFacebook(){
    return 'login facebook'
  }

 
   @UseFacebookAuth()
   @Get("facebook/callback")
   facebookCallback(@Req() req):Partial<FacebookAuthResult>{
    const result: FacebookAuthResult = req.hybridAuthResult;
    console.log(result)
    return{
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile
    };
   }

   @UseGoogleAuth()
   @Get('google')
   loginWithGoogle(){
    return 'login google'
   }

   @UseGoogleAuth()
   @Get('google/callback')
   googleCallback(@Req() req):Partial<GoogleAuthResult>{
    const result: GoogleAuthResult = req.hybridAuthResult;
    const email = result.profile.emails[0].value
    const emailhere =  this.userService.getByEmail(email)
    console.log(emailhere)
    if(emailhere){
      console.log("email is in here")
    }else{
      console.log("email is in outside")
    }
    return {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile
    }
   }
}
