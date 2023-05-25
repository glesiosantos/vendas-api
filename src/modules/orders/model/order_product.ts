import { Product } from 'src/modules/product/model/product'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order'

@Entity('product_orders')
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: string

  @ManyToOne(() => Product, product => product.orderProducts)
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column()
  quantity: number

  @ManyToOne(() => Order, order => order.productOrders)
  @JoinColumn({ name: 'order_id' })
  order: Order
}
