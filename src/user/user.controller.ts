import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //어드민만 접근 가능+ pagination+ 검색  =>>>>>숙제 
  @Get('all')
  async getUsers(){
    return this.userService.getAllUsers()
  }

}
