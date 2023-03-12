import { Product } from "@root/product/entities/product.entity";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Comment extends AbstractEntity {
    @Column()
    public content: string;

    @ManyToOne(() => Product,(product) => product.comments,{nullable:true})
    public product: Product;
}
