import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { RequestWithUserInterface } from "./requestWithUser.interface";
import { LocalAuthGuard } from "./guard/localAuth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto){
    const user = await this.authService.signup(createUserDto)
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // async login(@Body() loginUserDto: LoginUserDto ){
  //   // const loggedUser = await this.authService.getAuthicatedUser(loginUserDto.email, loginUserDto.password)
  //   //return loggedUser;
  // }
  async login(@Req() request: RequestWithUserInterface){
    const user = request.user //로그인한 상대는 유저
    return user;
  }

}
