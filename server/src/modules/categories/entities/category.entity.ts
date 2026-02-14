import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  name!: string;

  @Column({ length: 50, unique: true })
  slug!: string;

  @Column({ length: 10 })
  icon!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
