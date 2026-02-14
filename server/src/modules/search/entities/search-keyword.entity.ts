import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('search_keywords')
export class SearchKeyword {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  keyword!: string;

  @Column({ length: 20 })
  type!: string; // 'popular' | 'recommended'

  @Column({ name: 'sort_order', default: 0 })
  sortOrder!: number;
}
