import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>
  ) {}

  async getAllUsers() {
    return await this.userRepository.find({})
    
  }
  async getByEmail(email:string) { //email로 검색
    const user = await this.userRepository.findOneBy({email})
    console.log(user,"is user here?")
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

}
