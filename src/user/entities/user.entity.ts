import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";
import { Source } from "./source.enum";
import { Role } from "./role.enum";
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

  @Column({
    type: 'enum',
    enum: Source,
    default: Source.EMAIL
  })
  public source :  Source;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  public role :  Role;

  @Column()
  public phone: number;

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }
  

}
