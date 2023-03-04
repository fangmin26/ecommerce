import { Controller, Get, Post, Body,UseGuards, UseInterceptors, HttpException, HttpStatus, Query, Req, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@root/auth/requestWithUser.interface';
import { PageOptionDto } from '@root/common/dtos/page-option.dto';
import { Page } from '@root/common/dtos/page.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Express } from 'express'; //buffer에러가 날 경우 express import 안되어있는 경우의 수
import * as bcrypt from 'bcryptjs'
@ApiTags('user')
@Controller('user')
// @UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(RoleGuard(Role.ADMIN))
  @Get('all')
  async getUsers(
    @Query() pageOptionDto:PageOptionDto
  ):Promise<Page<User>>{
    return this.userService.getAllUsers(pageOptionDto)
  }

  @Get(":id")
  async getUserById( id:string){
  
    if(id !== undefined){
      return this.userService.getById(id)
    }else{
      throw new HttpException('user id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }

  //s3
  // @Post('profileimage')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // async addAvatar(@Req() request: RequestWithUserInterface, @UploadedFiles() file:Express.Multer.File){
  //   return this.userService.addAvatar(request.user.id, file.buffer, file.originalname)
  // }
  @Post('profileimage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUserInterface, @UploadedFile() file: Express.Multer.File) {
    return this.userService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @Put('passwordchange')
  @UseGuards(JwtAuthGuard)
  async changePasswordIn(@Req() request:RequestWithUserInterface, @Body('password') password:string){
    const {user} = request
    const newpass = await bcrypt.hash(password,10)
    await this.userService.changePassword(user.email, newpass)
    return 'success passwordchange'
  }

}
