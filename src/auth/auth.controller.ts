import { Controller, Get, Post, Body, Req, UseGuards, Put, HttpCode, Inject, CACHE_MANAGER } from "@nestjs/common";
import { CreateUserDto } from "@user/dto/create-user.dto";
import { RequestWithUserInterface } from "./requestWithUser.interface";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
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
import JwtRefreshGuard from "./guard/jwt-refresh-auth.guard";
import {Cache} from 'cache-manager'
@ApiTags('auth')
@Controller('auth')
// @UseInterceptors(ClassSerializerInterceptor) //해당부분만 exclude적용
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER)
    private cacheManager : Cache
  ) {}

  @Post('signup')
  @ApiCreatedResponse({
    description:'the record has been seccuess',
    type:User
  })
  async signup(@Body() createUserDto: CreateUserDto){
    const user = await this.authService.signup(createUserDto)
    await this.authService.sendVerificationLink(createUserDto.email)
    return user;
  }

  @Post('email/confirm')
  @ApiResponse({status:200, description:"confirmation email"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: '회원가입시 정송된 이메일로 인증', description: '사용자 전체 조회',})
  async confirm(@Body() confirmationDto: ConfirmEmailDto){
    const email = await this.authService.decodedConfirmationToken(confirmationDto.token)
    await this.authService.confirmEmail(email)
    return 'success'
  }

  @Post('login')
  @ApiResponse({
    description:'the record has been seccuess',
    type:User
  })
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인 - email,username,password', description: '이메일 로그인',})

  async login(@Req() request: RequestWithUserInterface){
    const user = request.user //로그인한 상대는 유저
    await this.cacheManager.set(user.id, user)
    const accessTokenCookie = await this.authService.generateJWT(user.id)
    const {
      cookie: refreshTokenCookie,
      token: refreshToken
    } = await this.authService.generateRefreshToken(user.id)
    // request.res.setHeader('Set-Cookie',accessTokenCookie)
    await this.userService.setCurrentsRefreshToken(refreshToken, user.id)
    request.res.setHeader('Set-Cookie',[accessTokenCookie,refreshTokenCookie])
    return {user,accessTokenCookie}; //확인때문에 accessToken추가
  }

  @Get('profile')
  @ApiResponse({
    description:'the record has been seccuess',
    type:User
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'jwt토큰으로 프로필가져오기', description: '프로필 가져오기',})
  async getProfile(@Req() request: RequestWithUserInterface){
    const {user} = request
    const cachData =  await this.userService.setCacheData(request.user.id)
    console.log(cachData,'cacheData')
    return cachData ?? user 
    // return user;

    
    // const cacheData= await this.cacheManager.get(user.id)
    // console.log(cacheData,'cahc')
    // console.log(typeof cacheData,'typeof cach')
    // if(cacheData){
    //   console.log(cacheData,'cachedata')
    //   return cacheData
    // }else{
    //   return user;
    // }


  }

  @Post('check') //본인인증 //boot pay docs 본인인증 2-1 (서버사이드 ) /1-1은 클라이언트
  @ApiOperation({ summary: 'bootpay 본인인증', description: 'bootpay 본인인증',})
  @ApiResponse({status:200, description:"check 본인인증"})
  @ApiResponse({status:401, description:"forbidden"})
   async checkAuthenticate() {
    return await this.authService.checkAuth()
   }

  @Post('confirm/authenticate')
  @ApiOperation({ summary: 'bootpay 본인인증 확인', description: 'bootpay 본인인증 확인',})
  @ApiResponse({status:200, description:"confirm authenticate"})
  @ApiResponse({status:401, description:"forbidden"})
  async confirmAuthenticate(@Body() confirmAuthenticateDto: ConfirmAuthenticate) {
  return await this.authService.authenticateConfirm(confirmAuthenticateDto)
  }

  @Get("facebook")
  @ApiOperation({ summary: 'facebook login', description: 'facebook login',})
  @ApiResponse({status:200, description:"facebook login"})
  @ApiResponse({status:401, description:"forbidden"})
  @UseFacebookAuth()

  loginWithFacebook(){
  return 'login facebook'
  }

  @Get("facebook/callback")
  @ApiOperation({ summary: 'facebook login callback', description: 'facebook login callback',})
  @ApiResponse({status:200, description:"facebook callback success"})
  @ApiResponse({status:401, description:"forbidden"})
  @UseFacebookAuth()
   facebookCallback(@Req() req):Partial<FacebookAuthResult>{
    const result: FacebookAuthResult = req.hybridAuthResult;
    console.log(result)
    return{
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      profile: result.profile
    };
   }

   @Get('google')
   @ApiOperation({ summary: 'google login', description: 'google login',})
   @ApiResponse({status:200, description:"google login success"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseGoogleAuth()
   loginWithGoogle(){
    return 'login google'
   }

   @Get('google/callback')
   @ApiOperation({ summary: 'google login callback', description: 'google login callback',})
   @ApiResponse({status:200, description:"google callback success"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseGoogleAuth()
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

   @Post('password/findbyemail')
   @ApiOperation({ summary: 'password findby email', description: 'email 로 토큰(이메일과 다른) 링크 확인 후 changePasswordByEmail로 password change',})
   @ApiResponse({status:200, description:"passwordfind by email success"})
   @ApiResponse({status:401, description:"forbidden"})
   async findPassword(@Body('email') email:string){
    const findUser = await this.userService.findPasswordByEmail(email)
    await this.authService.sendPasswordVerification(findUser.email)
    console.log(findUser) 
    return "successful send password link"
   }

   @Put('password/changebyemail')
   @ApiOperation({ summary: 'password changeby email', description: 'password changeby email',})
   @ApiResponse({status:200, description:"passwordchange by email success"})
   @ApiResponse({status:401, description:"forbidden"})

   async changePassword(@Body() passwordChangeDto: PasswordChangeDto){
    const passchange =await this.authService.changePassword(passwordChangeDto);
    console.log(passchange,'-------------------passchange')
    return 'changepassword success'
   }

   @Get('refresh')
   @ApiOperation({ summary: 'refresh token in cookies', description: 'refresh token in cookies',})
   @UseGuards(JwtRefreshGuard)
   @ApiResponse({status:200, description:"logout success"})
   @ApiResponse({status:401, description:"forbidden"})
   refresh(@Req() req:RequestWithUserInterface) {
    const accessTokenCookie = this.authService.generateJWT(req.user.id)
    req.res.setHeader('Set-Cookie',accessTokenCookie)
    return req.user;
   }

   @Post('logout')
   @ApiOperation({ summary: 'logout', description: 'logout',})
   @ApiResponse({status:200, description:"logout success"})
   @ApiResponse({status:401, description:"forbidden"})
   @UseGuards(JwtAuthGuard)
   @HttpCode(200)
   async logout(@Req() request:RequestWithUserInterface) {
    await this.cacheManager.del(request.user.id)
    await this.userService.removeRefreshToken(request.user.id)
    request.res.setHeader('Set-Cookie',this.authService.getCookiesForLogout())
   }
}

