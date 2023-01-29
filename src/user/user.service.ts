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

  async getByEmail(email:string) { //email로 검색
    const user = await this.userRepository.findOneBy({email})
    if (user){
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async getById(id:number){ //id로 검색
    const user = await this.userRepository.findOneBy({id})
    if (user) return user;
    throw  new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }


}
