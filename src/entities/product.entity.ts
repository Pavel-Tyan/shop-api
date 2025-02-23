import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  count: number;

  @Column()
  measure: string;

  @Column()
  img: string;

  @Column({ nullable: true })
  category: string;
}
