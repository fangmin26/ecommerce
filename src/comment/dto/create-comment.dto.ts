import { Product } from "@root/product/entities/product.entity";
import { Entity } from "typeorm";

@Entity()
export class CreateCommentDto {
    public contents: string;

    public product: Product;
}
