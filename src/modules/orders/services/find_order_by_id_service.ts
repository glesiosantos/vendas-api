import { AppDataSource } from 'src/config/app_data_source'
import { Order } from '../model/order'

export class FindOrderByIdService {
  async load (id: string): Promise<Order | null> {
    const orderRepository = AppDataSource.getRepository(Order)
    const order = await orderRepository.findOne({
      where: { id },
      relations: ['orderProduct', 'customer']
    })
    return order
  }
}
