import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link extends BaseEntity {
  @PrimaryGeneratedColumn() // 기본키
  id: number;

  // TODO User 테이블과 연결 필요
  // @Column()
  // createdBy: number;

  @Column()
  name: string;

  @Column()
  url: string;

  // TODO Category 테이블과 연결 필요
  @Column()
  category: number;
}
