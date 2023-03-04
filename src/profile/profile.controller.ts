import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '@auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@auth/requestWithUser.interface';
import { User } from '@root/user/entities/user.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    ) {}

  @ApiCreatedResponse({
    description:'the record has been seccuess',
    type:User
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  //header에 토큰 body에 입력값
  async createProfile(@Req() request:RequestWithUserInterface, @Body() createProfileDto:CreateProfileDto){
    const {user} = request
    return await this.profileService.create({
      ...createProfileDto, 
      user 
    })
  }
}
