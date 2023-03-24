import { Controller, Get, Post, Body,UseGuards, UseInterceptors, HttpException, HttpStatus, Query, Req, UploadedFile, Put, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@root/auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@auth/requestWithUser.interface';
import { PageOptionDto } from '@common/dtos/page-option.dto';
import { Page } from '@common/dtos/page.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { Express } from 'express'; //buffer에러가 날 경우 express import 안되어있는 경우의 수
import { FilesService } from '@root/files/files.service';
import { RoleGuard } from './guard/role.guard';
import { Role } from './entities/role.enum';
import { CheckPasswordDto } from './dto/check-password.dto';

@ApiTags('user')
@Controller('user')
// @UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly filesService:FilesService
    ) {}
  @Get('all')
  @ApiCreatedResponse({
    description:'the record has been seccuess',
    type:User
  })
  @ApiOperation({ summary: '모든 유저 정보 가져오기', description: '모든 유저 정보 가져오기',})
  @UseGuards(RoleGuard(Role.USER))

  async getUsers(
    @Query() pageOptionDto:PageOptionDto
  ):Promise<Page<User>>{
    return this.userService.getAllUsers(pageOptionDto)
  }

  @Get(":id")
  @ApiResponse({status:200, description:"id find success"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: '유저 id로 정보 가져오기', description: '유저 id로 정보 가져오기',})
  @UseGuards(RoleGuard(Role.USER))
  async getUserById(@Param('id') id:string){
    console.log(id,'id')
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
  @ApiResponse({status:200, description:"profile file post success"})
  @ApiResponse({status:401, description:"forbidden"})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: RequestWithUserInterface, @UploadedFile() file: Express.Multer.File) {
    return this.userService.addAvatar(request.user.id, file.buffer, file.originalname);
  }

  @Post('profileimage/delete')
  @ApiResponse({status:200, description:"profile file delete success"})
  @ApiResponse({status:401, description:"forbidden"})
  @UseGuards(JwtAuthGuard)
  async deleteAvatar(@Body('id') id:string){
    await this.filesService.deleteAvatar(id)
    return 'success delete profileimage'
  }
  
  @Put('password/checkandChange')
  @ApiResponse({status:200, description:"passwordchange success"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: '로그인한(토큰)상태에서 비밀번호 변경', description: '로그인한(토큰)상태에서 비밀번호 변경',})
  @UseGuards(JwtAuthGuard)
  async changePasswordIn(@Req() request:RequestWithUserInterface, @Body() checkPasswordDto:CheckPasswordDto){
    console.log(request.user)
    const {user} = request
    await this.userService.isInPass(user.email,checkPasswordDto.checkpassword)
    await this.userService.changePassword(user.email, checkPasswordDto.password)
    return 'success passwordchange'
  }

  // @Get('cron')
  // async debugCron(){
  //   return this.userService.handleCron()
  // }
}
