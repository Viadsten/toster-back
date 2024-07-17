import { BaseModel } from "src/models/BaseModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseModel {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string
}
