import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "../user/dto/create-user.dto";
import { RequestWithUserInterface } from "./requestWithUser.interface";
import { LocalAuthGuard } from "./guard/localAuth.guard";
import {Response} from "express";
import { JwtAuthGuard } from "./guard/jwtAuth.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto){
    const user = await this.authService.signup(createUserDto)
    await this.authService.sendVerificationLink(createUserDto.email)
    return user;
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


}
