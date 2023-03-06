import { Controller, Get, Post, Body,UseGuards, UseInterceptors, HttpException, HttpStatus, Query, Req, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@auth/requestWithUser.interface';
import { PageOptionDto } from '@common/dtos/page-option.dto';
import { Page } from '@common/dtos/page.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Express } from 'express'; //buffer에러가 날 경우 express import 안되어있는 경우의 수
import { FilesService } from '@root/files/files.service';

@ApiTags('user')
@Controller('user')
// @UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly filesService:FilesService
    ) {}

  @ApiCreatedResponse({
    description:'the record has been seccuess',
    type:User
  })
  // @UseGuards(RoleGuard(Role.ADMIN))
  @Get('all')
  async getUsers(
    @Query() pageOptionDto:PageOptionDto
  ):Promise<Page<User>>{
    return this.userService.getAllUsers(pageOptionDto)
  }

  @ApiResponse({status:200, description:"id find success"})
  @ApiResponse({status:401, description:"forbidden"})
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

  @ApiResponse({status:200, description:"profile file post success"})
  @ApiResponse({status:401, description:"forbidden"})
  @Post('profileimage')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUserInterface, @UploadedFile() file: Express.Multer.File) {
    return this.userService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @ApiResponse({status:200, description:"profile file delete success"})
  @ApiResponse({status:401, description:"forbidden"})
  @Post('profileimage/delete')
  @UseGuards(JwtAuthGuard)
  async deleteAvatar(@Body('id') id:string){
    await this.filesService.deleteAvatar(id)
    return 'success delete profileimage'
  }
  
  @ApiResponse({status:200, description:"passwordchange success"})
  @ApiResponse({status:401, description:"forbidden"})
  @Post('password/change')
  @UseGuards(JwtAuthGuard)
  async changePasswordIn(@Req() request:RequestWithUserInterface, @Body('password') password:string, @Body('checkpassword')checkpassword:string){
    const {user} = request
    await this.userService.isInPass(user.email,checkpassword)
    await this.userService.changePassword(user.email, password)
    return 'success passwordchange'
  }

  // @Get('cron')
  // async debugCron(){
  //   return this.userService.handleCron()
  // }
}
