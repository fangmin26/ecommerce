import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { User } from "@root/user/entities/user.entity";
import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
