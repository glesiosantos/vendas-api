import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('account_tokens')
export class AccountToken {
  @PrimaryGeneratedColumn('identity')
  id: string

  @Column()
  token: string

  @Column({ name: 'account_id' })
  accountId: string

  @Column({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'updated_at' })
  updatedAt: Date
}
