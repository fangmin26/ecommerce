import { Category } from "@root/category/entities/category.entity";
import { Comment } from "@root/comment/entities/comment.entity";
import {  AbstractEntityExceptId } from "@root/user/entities/abstract.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product{
 
  @PrimaryGeneratedColumn('uuid')
  public id: string;

//  @ManyToMany(
//   ()=>Category,
//   (category: Category) =>category.products
//  )
//  @JoinTable()
//   public categories: Category[]

  // @PrimaryGeneratedColumn()//productnumber용으로 만듬
  // id:number;

  @Column({nullable:true})
  public title: string

  @Column()
  public content: string

  @Column()
  public startFunding: string

  @Column()
  public endFunding: string

  @Column()
  public startDeleviery:string

  @Column()
  public deliveryFee: number

  @Column()
  public productLimit: number

  @Column()
  public price: number

  @OneToMany(
    () => Comment,
    (comment: Comment) => comment.product,
    {nullable:true}
  )
  @JoinColumn()
  public comments?: Comment[]

}
