import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public username: string;

  @Column({unique:true})
  public email: string;

  @Column({nullable:true})
  @Exclude() //password안나옴
  public password?: string;

  @Column({default:false})
  public isEmailConfirmed: boolean

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }

}
