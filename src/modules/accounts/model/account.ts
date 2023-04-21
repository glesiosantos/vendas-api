import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export default class Account {
  @PrimaryGeneratedColumn()
    id: string

  @Column()
    avatar: string

  @Column()
    name: string

  @Column()
    email: string

  @Column()
    password: string

  @Column({ name: 'is_admin' })
    isAdmin: boolean

  @Column({ name: 'created_at' })
    createdAt: Date

  @Column({ name: 'updated_at' })
    updatedAt: Date
}
