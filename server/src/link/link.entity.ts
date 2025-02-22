import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키
  id: number;

  // --@ManyToOne 링크는 한명의 사용자를 갖는다.
  // --@JoinColumn은 외래 키(FK)의 컬럼명을 명시하는 역할, 즉 외래키가 테이블의 createdById 컬럼과 연결된다.
  // --@JoinColumn은 외래 키가 위치하는 테이블의 필드에만 사용해야 한다.
  @ManyToOne(() => User, (user) => user.links, { eager: false })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column()
  name: string;

  @Column()
  url: string;

  // --@ManyToOne 링크는 하나의 카테고리를 갖는다.
  // --@JoinColumn은 외래 키(FK)가 테이블의 categoryId 컬럼과 연결된다.
  @ManyToOne(() => Category, (category) => category.links, { eager: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @CreateDateColumn({ type: 'timestamp' })
  createDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateDate: Date;
}
