import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  password: string;

  // @IsPhoneNumber()
  // @IsNumber()
  @IsString()
  phone: string; //Number 자바스크립트에서만 씀 
}
