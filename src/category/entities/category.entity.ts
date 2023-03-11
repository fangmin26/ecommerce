import { Product } from "@root/product/entities/product.entity";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column()
    name: string;

    // @ManyToMany(
    //     () => Product,
    //     (product: Product) => product.categories
    // )
    // public products: Product[]
}
