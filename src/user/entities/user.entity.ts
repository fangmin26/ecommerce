import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'
import { Exclude } from "class-transformer";
import { Source } from "./source.enum";
import { Role } from "./role.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";
import * as grabatar from "gravatar"
import { AbstractEntity } from "./abstract.entity";
import { Profile } from "@root/profile/entities/profile.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { Product } from "@root/product/entities/product.entity";
@Entity()
export class User extends AbstractEntity{
  @ApiProperty()
  @Column()
  public username: string;

  @ApiProperty()
  @Column({unique:true})
  public email: string;

  @ApiProperty()
  @Column({nullable:true})
  @Exclude() //password안나옴
  @MinLength(8)
  @MaxLength(20)
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

  @ApiProperty()
  @Column({nullable:true})
  @IsString()
  public profile_img?: string;

  @OneToOne(()=> Profile,{
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public profile: Profile

  @ManyToMany(
    () => Product,
    (product:Product) => product.fundingList
  )
  @JoinTable()
  public fundingProducts: Product[]

  // @OneToMany(
  //   () => Comment,
  //   (comment: Comment) => comment.author
  // )
  // public comment: Comment[]

  @ApiProperty()
  @Column({nullable:true})
  @Exclude()
  public currentHashedRefreshToken?: string;
  
  // @OneToMany(()=>Product, (product:Product) =>product.funding)
  // public fundingProduct:Product[]

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(){
    // this.password = await bcrypt.hash(this.password, 10);
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }

  @BeforeInsert()
  async genarateProfileImg(){
    this.profile_img = await grabatar.url(
      this.email,
      {s: '100',protocol:'https'},
    )
  }
}
