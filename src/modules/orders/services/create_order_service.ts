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

    // capturando os ids da requisição
    orderModel.products.map(p => productIds.push(p.id))

    // validando a existencia dos produtos
    const productsExists = await productRepository.find({ where: { id: In(productIds) } })

    if (!productsExists.length) {
      throw new AppError('Cloud not find any product with then given ids')
    }

    // Listar os produtos que não foram econtrado
    const checkInexistProduct = orderModel.products.filter(p => !productIds.includes(p.id))

    // se encontrar algum produto
    if (checkInexistProduct.length) throw new AppError(`Cloud not found product with ids ${checkInexistProduct}`)

    // comparando se a quantidade é o suficiente para realizar a venda
    const quantityAvailable = orderModel.products.filter(
      p => productsExists.filter(prod => prod.id === p.id)[0].quantity >= p.quantity
    )

    if (!quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`)
    }

    //  Criando a lista de produtos do pedido
    const products = orderModel.products.map(product => ({
      product: productsExists.filter(p => p.id === product.id)[0],
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price
    }))

    const order = orderRepository.create({
      customer: customerExists,
      productsOrder: products
    })

    // atualizar a quantidade de produto no banco
    const { productsOrder } = order

    const updateQuantityStock = productsOrder.map(productByOrder => ({
      id: productByOrder.product.id,
      quantity: productsExists.filter(p => p.id === productByOrder.product.id)[0].quantity - productByOrder.quantity
    }))

    await orderRepository.save(order)
    await productRepository.save(updateQuantityStock)
  }
}
