import { Link } from 'src/link/link.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // --OneToMany 하나의 카테고리는 여러개의 링크를 가질 수 있다.
  @OneToMany(() => Link, (link) => link.category, { eager: false })
  links: Link[];
}
