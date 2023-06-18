import { AppDataSource } from 'src/config/app_data_source'
import { Order } from '../model/order'
import { Product } from 'src/modules/product/model/product'
import { Customer } from 'src/modules/customer/model/customer'
import { In } from 'typeorm'
import { OrderProduct } from '../model/order_product'
import AppError from 'src/shared/erros/app_error'

type ProductOrderModel = {
  id: string
  quantity: number
}

type OrderModel = {
  customerId: string
  products: ProductOrderModel[]
}

export class CreateOrderService {
  async add (orderModel: OrderModel): Promise<void> {
    const orderRepository = AppDataSource.getRepository(Order)
    const orderProductRepository = AppDataSource.getRepository(OrderProduct)
    const customerRepository = AppDataSource.getRepository(Customer)
    const productRepository = AppDataSource.getRepository(Product)

    // validando cliente
    const customerExists = await customerRepository.findOneBy({ id: orderModel.customerId })
    if (!customerExists) throw new AppError('Customer not found or null')

    const productIds: string[] = [] // Carregar uma lista de id dos produtos selecionado

    // validando a existencia dos produtos
    const productsExists = await productRepository.createQueryBuilder('product').where('product.id IN (:ids)', { productIds }).getMany()
    productsExists.map(product => product.name)
    // if (!productsExists.length) throw new AppError('Product id not found or null')

    // await orderRepository.save(order)
  }
}
