
import { User } from "@root/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { AbstractEntity } from "@root/user/entities/abstract.entity";
@Entity()
export class Profile extends AbstractEntity{
    // @PrimaryColumn('uuid')
    @Column({nullable:true})
    interest?: string;

    @Column({nullable:true})
    company?: string;

    @Column({nullable:true})
    school?:string;
    
    @Column({nullable:true})
    note?:string;

    // @Column()
    @OneToOne(()=>User,(user:User) =>user.profile)
    user: User;
}
