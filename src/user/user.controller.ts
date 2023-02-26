import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpException, HttpStatus, Query, Req, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@root/auth/requestWithUser.interface';
import { PageOptionDto } from '@root/common/dtos/page-option.dto';
import { Page } from '@root/common/dtos/page.dto';
import { TransformInterceptor } from '@root/common/interceptor/transfor.interceptor';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Express } from 'express'; //buffer에러가 날 경우 express import 안되어있는 경우의 수
@ApiTags('user')
@Controller('user')
@UseInterceptors(TransformInterceptor)
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
  async getUserById(@Param() id:string){
  
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

}
