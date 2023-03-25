import { AbstractEntity } from "@root/user/entities/abstract.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Library extends AbstractEntity {
    @Column()
    public bookname: string;

    @Column()
    public libraryname: string;

    @Column()
    public writer: string;

    @Column()
    public publisher: string;

}
