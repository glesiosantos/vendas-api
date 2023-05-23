import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('customers')
export default class Customer {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  whatsapp: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date
}
