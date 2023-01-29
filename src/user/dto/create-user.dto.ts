import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsNull } from "typeorm";

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
}
