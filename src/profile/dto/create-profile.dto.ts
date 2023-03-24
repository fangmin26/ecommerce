import { ApiProperty } from "@nestjs/swagger";
import { User } from "@user/entities/user.entity";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProfileDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    interest?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    company?: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    school?:string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    note?:string;

    user: User;

}
