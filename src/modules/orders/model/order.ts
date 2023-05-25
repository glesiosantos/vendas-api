import Customer from 'src/modules/customer/model/customer'
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { OrderProduct } from './order_product'

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true })
  productOrders: OrderProduct[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
