import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SalesEntity } from "./sales.entity";
import { ProductsEntity } from "src/products/entity/products.entity";


@Entity('sale_details')
export class SalesDetailsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => SalesEntity)
    @JoinColumn({ name: "sale_id" })
    sales: SalesEntity;

    @Column()
    sale_id: number;

    @ManyToOne(() => ProductsEntity)
    @JoinColumn({ name: "product_id" })
    product: ProductsEntity;


    @Column()
    qty: number;

    @Column("decimal")
    price: number;
}