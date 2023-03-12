
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany} from "typeorm";
import * as numberGenerator from "number-generator";
import { Comment } from "@root/comment/entities/comment.entity";
import { Category } from "@root/category/entities/category.entity";

@Entity()
export class Product extends AbstractEntity{


  @OneToMany(() => Comment,(comment) => comment.product,{nullable:true})
  @JoinColumn()
  public comments?: Comment[]

  @ManyToMany(
  ()=>Category,
  (category: Category) =>category.products,{nullable:true}
  )
  @JoinTable()
  public categories: Category[]

  @Column()
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

  @Column({nullable:true})
  public productNum: number

  @BeforeInsert()
  async generateProductNum(){
   this.productNum = await numberGenerator.murmurhash2_x86_32(this.title)
  }
}
