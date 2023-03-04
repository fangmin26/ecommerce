import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { QueryBuilder, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { PageOptionDto } from "@root/common/dtos/page-option.dto";
import { Page } from "@root/common/dtos/page.dto";
import { PageMetaDto } from "@root/common/dtos/page-meta.dto";
import { FilesService } from "@root/files/files.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private readonly filesService:FilesService
  ) {}

  async getAllUsers(
    pageOptionDto:PageOptionDto
  ): Promise<Page<User>> {
    const querBuilder = this.userRepository.createQueryBuilder('user')
    querBuilder.orderBy('user.createdAt', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take)

    const itemCount = await querBuilder.getCount()
    const {entities} = await querBuilder.getRawAndEntities()
    const pageMetaDto = new PageMetaDto({itemCount, pageOptionDto})
    return new Page(entities,pageMetaDto)
  }
  async getByEmail(email:string) { //email로 검색
    const user = await this.userRepository.findOneBy({email})
    // console.log(user,"is user here?")
    if (user){
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getUserByEmail(email:string) { //user있는지 찾기
    const user = await this.userRepository.findOneBy({email})
      return user;
  }

  async getById(id:string){ //id로 검색
    const user = await this.userRepository.findOneBy({id})
    console.log(user)
    console.log(id)
    if (user) return user;
    throw  new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async markEmailAsConfirmed(email: string){
    return this.userRepository.update({email},{
      isEmailConfirmed: true
    })
  }

  async updateAuthenticationConfirm(phone:string, realname:string,gender:number){//인증 확인
     const updatedUser = this.userRepository.update({phone},{
      isSelfCheck: true,
      realname,
      gender
     })

     return updatedUser;
  }

  //s3
  // async addAvatar(userId:string, imageBuffer:Buffer, filename: string) {
  //   const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename)//table생성, s3파일 저장
  //   const user =  await this.getById(userId); //어느 유저에 저장할건지를 찾고
  //   await this.userRepository.update(userId, {
  //     ...user,
  //     profile_img:avatar.url
  //   })//update
  //   return avatar;
  // }
  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    // 테이블 생성 s3 파일 저장
    const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
    // 어느 user에 저장 할건지를 찾고
    const user = await this.getById(userId);
    // 업데이트
    await this.userRepository.update(userId, {
      ...user,
      profile_img: avatar.url
    });
    return avatar;
  }

}
