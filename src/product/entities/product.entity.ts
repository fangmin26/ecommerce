
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { BeforeInsert, Column, Entity} from "typeorm";
import * as numberGenerator from "number-generator";
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
  public productNum: number

  @BeforeInsert()
  async generateProductNum(){
    const today =
    String(new Date().getFullYear())
    +String(new Date().getDate())
    +String(new Date().getMonth())
    +String(new Date().getDay())
    +String(new Date().getHours())
    +String(new Date().getMinutes())+this.title+this.content
   this.productNum = await numberGenerator.murmurhash2_x86_32(today)
  }
}
