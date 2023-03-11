
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "@root/category/entities/category.entity";
import {  AbstractEntityExceptId } from "@user/entities/abstract.entity";
// import { Category } from "aws-sdk/clients/cloudformation";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import {  Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CreateProductDto  {
    // @PrimaryGeneratedColumn('uuid')
    // public id: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // public categories: Category[]

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public content: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public startFunding: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public endFunding: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public startDeleviery:string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public deliveryFee: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public productLimit: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    public price: number


}
