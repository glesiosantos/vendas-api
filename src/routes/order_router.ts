import { Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import Joi from 'joi'
import { OrderController } from 'src/modules/orders/order_controller'
import isAuthenticated from 'src/shared/middlewares/is_authenticate'

const orderController = new OrderController()

export default (router: Router): void => {
  router.post('/orders', isAuthenticated, orderController.register)
  router.get('/orders', isAuthenticated, orderController.getOrders)
  router.get('/orders/:id', celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }), isAuthenticated, orderController.getOrderById)
}
