import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
import { Source } from "./source.enum";
import { Role } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { Social } from "./social.enum";
@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @ApiProperty()
  @Column()
  public username: string;

  @ApiProperty()
  @Column({unique:true})
  public email: string;

  @ApiProperty()
  @Column({nullable:true})
  @Exclude() //password안나옴
  public password?: string;

  @ApiProperty()
  @Column({default:false})
  public isEmailConfirmed: boolean

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Source,
    default: Source.EMAIL
  })
  public source :  Source;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  public userrole :  Role;

  @ApiProperty()
  @Column({unique:true})
  @Column({nullable:true})
  public phone?: string;

  @ApiProperty()
  @Column({default:false})
  public isSelfCheck: boolean;

  @ApiProperty()
  @Column({nullable:true})
  public realname?: string;//수집용

  @ApiProperty()
  @Column({nullable:true})
  public gender?:number;//수집용



  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10);
  }
  

}
