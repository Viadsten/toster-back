import { BaseModel } from "src/models/BaseModel";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class TestEntry extends BaseModel {


    @ManyToOne(() => User , (user) => user.tests)
    author: User

}
