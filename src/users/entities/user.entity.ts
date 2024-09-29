import { BaseModel } from "src/models/BaseModel";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseModel {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    name: string

    @Column()
    email: string

    @Column({ nullable: true })
    password: string

    @Column({ default: false })
    isAccess: boolean

}
