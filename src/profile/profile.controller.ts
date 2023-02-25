import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { JwtAuthGuard } from '@root/auth/guard/jwtAuth.guard';
import { RequestWithUserInterface } from '@root/auth/requestWithUser.interface';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    ) {}

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
