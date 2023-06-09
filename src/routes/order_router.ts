import { type Router } from 'express'
import { OrderController } from 'src/modules/orders/order_controller'

const orderController = new OrderController()

export default (router: Router): void => {
  router.post('/orders', orderController.register)
}
