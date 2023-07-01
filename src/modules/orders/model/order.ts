import { Customer } from '../../customer/model/customer'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { OrderProduct } from './order_product'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrderProduct,
    orderProduct => orderProduct.order, { cascade: true })
  productsOrder: OrderProduct[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
