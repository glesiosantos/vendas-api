import { Order } from 'src/modules/orders/model/order'
import { OrderProduct } from 'src/modules/orders/model/order_product'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
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

  @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
  orderProducts: OrderProduct[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', update: true })
  updateAt: Date
}
