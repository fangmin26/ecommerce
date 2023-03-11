import { Product } from "@root/product/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    public id: string

    @Column()
    public content: string;

    @ManyToOne(
        () => Product,
        (product: Product) => product.comments
    )
    public product: Product;
}
