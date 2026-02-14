import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('banners')
export class Banner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 500 })
  image!: string;

  @Column({ length: 200 })
  title!: string;

  @Column({ length: 200 })
  link!: string;

  @Column({ name: 'sort_order', default: 0 })
  sortOrder!: number;
}
