import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateProductDto extends AbstractEntity {
    // @ApiProperty()
    // @IsString()
    // public category?: string[]

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public title: string

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public content: string

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public startFunding: Date

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public endFunding: Date

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public startDeleviery:Date

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public deliveryFee: number

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public productLimit: number

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public price: number

}
