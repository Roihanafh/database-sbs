import { Exclude } from "class-transformer";
import { CategoriesEntity } from "src/categories/entity/categories.entity";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(() => CategoriesEntity)
    @JoinColumn({ name: "category_id" })
    @Exclude()
    category: CategoriesEntity;

    categoryName: string;

    @AfterLoad()
    setCategoryName() {
        this.categoryName = this.category.name;
    }
}