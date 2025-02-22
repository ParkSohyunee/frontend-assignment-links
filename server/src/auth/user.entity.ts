import { Link } from 'src/link/link.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // --OneToMany 한명의 사용자는 여러개의 링크를 가질 수 있다.
  @OneToMany(() => Link, (link) => link.createdBy, { eager: false })
  links: Link[];

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Date;
}
