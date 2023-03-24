import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CheckPasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  checkpassword: string;
}