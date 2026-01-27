import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @Column()
    name: string;

    @Column("decimal")
    price: number;

    @Column()
    stock: number;
}