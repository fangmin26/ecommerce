import { Product } from "@root/product/entities/product.entity";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Category extends AbstractEntity{
    @Column()
    name: string;

    @ManyToMany(
        () => Product,
        (product: Product) => product.categories,{nullable:true}
    )
    public products: Product[]
}
