import { ApiProperty } from "@nestjs/swagger";
import { Product } from "@root/product/entities/product.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { Entity } from "typeorm";

@Entity()
export class CreateCommentDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public contents: string;

    public product: Product;

    @ApiProperty()
    @IsNotEmpty()
    public productId:string;
}
//nestJS를 활용항 product와 comment가 oneToMany 관계일때의 각각의 entity와,  comment를 생성하기 위한 코드를 짜줘
//이 명령어를 활용한 chatGPT 활용하기 !! 
