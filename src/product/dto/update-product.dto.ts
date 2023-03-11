
import { ApiProperty } from "@nestjs/swagger";
import {  AbstractEntityExceptId } from "@user/entities/abstract.entity";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import {  Entity, IsNull } from "typeorm";

@Entity()
export class UpdatedProductDto {
    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public category?: string[]

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
