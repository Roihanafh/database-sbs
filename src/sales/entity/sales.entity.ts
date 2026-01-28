import { Users } from "src/users/entity/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SalesDetailsEntity } from "./sales-details.entity";

@Entity('sales')
export class SalesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sale_date: Date;

    @Column()
    total_amount: number;

    @ManyToOne(() => Users)
    @JoinColumn({ name: "user_id" })
    user: Users;

    @OneToMany(() => SalesDetailsEntity, (salesDetails) => salesDetails.sales) 
    sales_details: SalesDetailsEntity[]

}