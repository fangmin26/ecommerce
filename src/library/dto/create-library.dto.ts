import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateLibraryDto {
    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public bookname: string;

    // @Column()
    // public libraryname: string;

    // @Column()
    // public writer: string;

    // @Column()
    // public publisher: string;
}
