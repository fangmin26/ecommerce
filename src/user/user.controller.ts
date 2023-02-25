import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from '@root/common/interceptor/transfor.interceptor';
import { Role } from './entities/role.enum';
import { RoleGuard } from './guard/role.guard';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(RoleGuard(Role.ADMIN))
  @Get('all')
  async getUsers(){
    return this.userService.getAllUsers()
  }

  @Get(":id")
  async getUserById(id:string){
  
    if(id !== undefined){
      return this.userService.getById(id)
    }else{
      throw new HttpException('user id가 없습니다',HttpStatus.NOT_FOUND)
    }

  }


}
