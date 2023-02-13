import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
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

  @Column({unique:true})
  public phone: string;

  @Column({default:false})
  public isSelfCheck: boolean;

  @Column({nullable:true})
  public realname?: string;//수집용

  @Column({nullable:true})
  public gender?:number;//수집용

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }
  

}
