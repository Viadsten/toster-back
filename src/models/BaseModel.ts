import { Entity, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel {
    @PrimaryGeneratedColumn()
    id: number
}