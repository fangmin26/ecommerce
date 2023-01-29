import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public username: string;

  @Column({unique:true})
  public email: string;

  @Column({nullable:true})
  public password?: string;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }

}
