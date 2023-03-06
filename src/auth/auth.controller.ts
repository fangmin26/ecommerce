import { Controller, Get, Post, Body, Req, UseGuards, Put } from "@nestjs/common";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { RequestWithUserInterface } from "./requestWithUser.interface";
import { ApiCreatedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FacebookAuthResult, UseFacebookAuth } from "@nestjs-hybrid-auth/facebook";
import { GoogleAuthResult, UseGoogleAuth } from "@nestjs-hybrid-auth/google";
import { PasswordChangeDto } from "@user/dto/password-change.dto";
import { User } from "@user/entities/user.entity";
import { ConfirmAuthenticate } from "@user/dto/confirm-authenticate.dto";
import { ConfirmEmailDto } from "@user/dto/confirm-email.dto";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";
import { AuthService } from "./auth.service";
import { UserService } from "@user/user.service";
import { LocalAuthGuard } from "./guard/localAuth.guard";

@ApiTags('auth')
@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor) //해당부분만 exclude적용
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



  @ApiResponse({status:200, description:"confirmation email"})
  @ApiResponse({status:401, description:"forbidden"})
  async confirm(@Body() confirmationDto: ConfirmEmailDto){
    const email = await this.authService.decodedConfirmationToken(confirmationDto.token)
    await this.authService.confirmEmail(email)
    return 'success'
  }

  @ApiResponse({
    description:'the record has been seccuess',
    type:User
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: RequestWithUserInterface){
    const user = request.user //로그인한 상대는 유저
    const token = await this.authService.generateJWT(user.id)
    return{user,token}
  }

  @ApiResponse({
    description:'the record has been seccuess',
    type:User
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request: RequestWithUserInterface){
    const {user} = request
    return user;

  }

  @ApiResponse({status:200, description:"check 본인인증"})
  @ApiResponse({status:401, description:"forbidden"})
  @Post('check') //본인인증 //boot pay docs 본인인증 2-1 (서버사이드 ) /1-1은 클라이언트
   async checkAuthenticate() {
    return await this.authService.checkAuth()
   }

   @ApiResponse({status:200, description:"confirm authenticate"})
   @ApiResponse({status:401, description:"forbidden"})
   @Post('confirm/authenticate')
   async confirmAuthenticate(@Body() confirmAuthenticateDto: ConfirmAuthenticate) {
    return await this.authService.authenticateConfirm(confirmAuthenticateDto)
   }

   @ApiResponse({status:200, description:"facebook login"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseFacebookAuth()
   @Get("facebook")
   loginWithFacebook(){
    return 'login facebook'
  }

 
  @ApiResponse({status:200, description:"facebook callback success"})
  @ApiResponse({status:401, description:"forbidden"})
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

   @ApiResponse({status:200, description:"google login success"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseGoogleAuth()
   @Get('google')
   loginWithGoogle(){
    return 'login google'
   }

   @ApiResponse({status:200, description:"google callback success"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseGoogleAuth()
   @Get('google/callback')
   googleCallback(@Req() req){
    const result: GoogleAuthResult = req.hybridAuthResult;
    const email = result.profile.emails[0].value
    const username = result.profile.displayName
    const password_before = result.profile.id + email;
    const photo = result.profile.photos[0].value
    //회원가입 + 로그인 
    const loginRes = this.authService.socialLogin(email,username,password_before,photo)
    return loginRes;
   }

   @ApiResponse({status:200, description:"passwordfind by email success"})
   @ApiResponse({status:401, description:"forbidden"})
   @Post('passwordfind')
   async findPassword(@Body('email') email:string){
    const findUser = await this.userService.findPasswordByEmail(email)
    await this.authService.sendPasswordVerification(findUser.email)
    console.log(findUser) 
    return "successful send password link"
   }

   @ApiResponse({status:200, description:"passwordchange by email success"})
   @ApiResponse({status:401, description:"forbidden"})
   @Put('password/change')
   async changePassword(@Body() passwordChangeDto: PasswordChangeDto){
    const passchange =await this.authService.changePassword(passwordChangeDto);
    console.log(passchange,'-------------------passchange')
    return 'changepassword success'
   }
}

