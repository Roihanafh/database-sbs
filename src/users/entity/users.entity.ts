import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    role: string;

    // @Column()
    // createdAt: Date;
    
}