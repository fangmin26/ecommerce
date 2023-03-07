import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntityExceptId{
    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}

export abstract class AbstractEntity extends AbstractEntityExceptId {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;
}



