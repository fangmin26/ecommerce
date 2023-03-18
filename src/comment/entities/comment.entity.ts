import { Product } from "@root/product/entities/product.entity";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { User } from "@root/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Comment extends AbstractEntity{
    @Column()
    contents: string

    // @ManyToOne(
    //     () => User,
    //     (author:User) => author.comment,
    // )
    // public author: User

    @ManyToOne(
        () => Product,
        (product: Product) => product.comment
    )
    public product: Product
}
