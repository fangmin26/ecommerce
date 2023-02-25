import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@root/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';

import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository:Repository<Profile>
  ){}
  async create(profileData: CreateProfileDto){
    const newProfile =  this.profileRepository.create(profileData)
    await this.profileRepository.save(newProfile)
    return newProfile;
  }
}
