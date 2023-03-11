
import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {  Entity, IsNull } from "typeorm";

@Entity()
export class UpdatedProductDto extends AbstractEntity {

    @ApiProperty()
    @IsString()
    public title?: string

    @ApiProperty()
    @IsString()
    public content?: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public startFunding?: string

    @ApiProperty()
    @IsString()
    public endFunding?: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public startDeleviery?:string

    @ApiProperty()
    @IsNumber()
    public deliveryFee?: number

    @ApiProperty()
    @IsNumber()
    public productLimit?: number

    @ApiProperty()
    @IsNumber()
    public price?: number
}
