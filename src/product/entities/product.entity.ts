
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany} from "typeorm";
import * as numberGenerator from "number-generator";
import { User } from "@root/user/entities/user.entity";
import { Comment } from "@root/comment/entities/comment.entity";
@Entity()
export class Product extends AbstractEntity{

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

  @Column()
  public productNum: string

  @ManyToMany(
    () => User, 
    (user:User) => user.fundingProducts
  )
 @JoinTable()
  public fundingList: User[]

  @OneToMany(
    () => Comment,
    (comment: Comment) => comment.product
  )
  public comment: Comment[]

  @BeforeInsert()
  async generateProductNum(){
    const randomNum = Math.floor(Math.random() * 10000) + 1;
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var dateString = year + month + day;
   this.productNum = dateString+randomNum
  }
}
