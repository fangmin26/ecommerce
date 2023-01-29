import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService
  ) {}

  public async signup(createUserDto: CreateUserDto) {
    try {
      return await  this.userService.create(createUserDto)
    }catch (error) {
      throw new HttpException('something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  public async getAuthicatedUser(email: string, plainTextPassword:string) {
    try {
      const user = await this.userService.getByEmail(email)
      // password 암호화 풀기 - 디코딩
      await this.verifyPassword(plainTextPassword, user.password)
      return user;
    }catch (error){
      throw new HttpException('no user here', HttpStatus.BAD_REQUEST)
    }
  }

  private async  verifyPassword(plainTextPassword:string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword)
    if(!isPasswordMatching) {
      throw new HttpException('wrong password', HttpStatus.BAD_REQUEST)
    }
  }
}
