import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date
}
