import { BaseModel } from "src/models/BaseModel";
import { TestEntry } from "src/test-entries/entities/test-entry.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => TestEntry, (test) => test.author)
    tests: TestEntry[]

}
