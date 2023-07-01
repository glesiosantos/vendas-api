import { AppDataSource } from 'src/config/app_data_source'
import { Order } from '../model/order'

export class LoadOrder {
  async load (): Promise<Order[]> {
    const orderRepository = AppDataSource.getRepository(Order)
    const orders = await orderRepository.find({
      relations: ['productsOrder', 'customer']
    })
    return orders
  }
}
