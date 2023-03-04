import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity} from "typeorm";

@Entity()
export class Product extends AbstractEntity{
//  @ManyToMany()
//   public category?: string[]

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
}
