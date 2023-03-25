import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import {  Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { PageOptionDto } from "@common/dtos/page-option.dto";
import { Page } from "@common/dtos/page.dto";
import { PageMetaDto } from "@common/dtos/page-meta.dto";
import { FilesService } from "@files/files.service";
import { Cron } from "@nestjs/schedule";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcryptjs'
import {Cache} from 'cache-manager'
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private readonly filesService:FilesService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache
  ) {}

  private readonly logger = new Logger(UserService.name)

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
    if (user) return user;
    throw  new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }

  async setCacheData(id:string){
    const user = await this.getById(id)
    const cacheData = await this.cacheManager.get(id)
    if(cacheData){
      return cacheData
    }
    return user;
  }

  async findPasswordByEmail(email:string ){
    const findUser = await this.userRepository.findOneBy({email})
    console.log(findUser)
    if(findUser){
      //email보내기
      
      return findUser
    }else{
      throw new HttpException('User with email does not exist', HttpStatus.NOT_FOUND)
    }
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async changePassword(email:string, password:string){
    const user = await this.userRepository.findOneBy({email})
    console.log(user, password,"~~~~~~~~~~~~~~~~~~")
    user.password = password
    return this.userRepository.save(user)
  }

  async isInPass(email:string,checkpassword:string){
    console.log(email,checkpassword,"~~checkpassword")
    const user = await this.userRepository.findOneBy({email})
    console.log(user)
    const isPasswordMatching= await bcrypt.compare(checkpassword, user.password)
    console.log(isPasswordMatching,"~~~?????")
    if(!isPasswordMatching) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
    }
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

  async setCurrentsRefreshToken(refreshToken:string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10)
    await this.userRepository.update(userId, {
      currentHashedRefreshToken
    }) 
  }

  async getUserInfoRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getById(userId)
    const isRefreshTokeMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    )
    if(isRefreshTokeMatching) return user
  }

  async removeRefreshToken(userId: string) {
    return this.userRepository.update(userId,{
      currentHashedRefreshToken:null
    })
  } 
  // @Cron('10 * * * * *') //10초마다 로그 =>구독,결제 시 사용많이함 (정기결제같은거 **)
  //  handleCron(){
  //   this.logger.debug('cron logger')
  // }

  @Cron('10 * * * * *') //10초마다 로그 =>구독,결제 시 사용많이함 (정기결제같은거 **)
   handleCron(){
    this.logger.debug('cron logger')
  }
}
