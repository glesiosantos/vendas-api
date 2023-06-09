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

    // atribuindo os id
    const ids: string[] = [] // para popular uma lista de ids fornecidos
    orderModel.products.map(p => ids.push(p.id))
    // validando a existencia dos produtos
    const productsExists = await productRepository.find({ where: { id: In(orderModel.products) } })
    if (!productsExists.length) throw new AppError('Product id not found or null')

    // chegando produtos inexistentes
    const productExistsId = productsExists.map(p => p.id)
    const checkedInexist = orderModel.products.filter(product => !productExistsId.includes(product.id))
    if (checkedInexist.length) {
      throw new AppError(`Product not found. ${checkedInexist[0].id}`)
    }

    const quantityAvailable = orderModel.products.filter(
      product => productsExists.filter(
        p => p.id === product.id // verifica o id informado com do banco de dados
      )[0].quantity >= product.quantity // verifica o stock do banco com a quantidade fornecida
    )

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available`)
    }

    // montar o pedido

    const order: Order = orderRepository.create({
       customer: customerExists,
      createdAt: new Date()
    })

    const productsOrder: OrderProduct[] = []

    orderModel.products.map(product => productsOrder.push({
      order,
      product: productsExists.filter(p => p.id === product.id)[0],
      quantity: product.quantity
    }))

    order.productOrders = productsOrder
    await orderRepository.save(order)
  }
}
