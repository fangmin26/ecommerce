import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class PublicFile extends AbstractEntity{
    @Column()
    public url: string;

    @Column()
    public key: string;
}
