import { AppDataSource } from 'src/config/app_data_source'
import { Order } from '../model/order'
import type Customer from 'src/modules/customer/model/customer'
import { type Product } from 'src/modules/product/model/product'

type AddOrderModel = {
  customerId: Customer
  productIds: string[]
  quantity: number
}

export class RegisterOrder {
  async add (orderModel: AddOrderModel): Promise<void> {
    const orderRepository = AppDataSource.getRepository(Order)
  }
}
