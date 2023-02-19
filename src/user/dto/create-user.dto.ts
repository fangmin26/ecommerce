import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
  @ApiProperty({default:'sample@email.com'})
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(20)
  password: string;

  @ApiProperty()
  @IsString()
  phone?: string; //Number 자바스크립트에서만 씀 
}
