import {  AbstractEntityExceptId } from "@root/user/entities/abstract.entity";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product extends AbstractEntityExceptId{
//  @ManyToMany()
//   public category?: string[]

  @PrimaryGeneratedColumn()//productnumber용으로 만듬
  id:number;

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
}
