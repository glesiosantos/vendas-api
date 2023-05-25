import { type Router } from 'express'
import { CustomerController } from 'src/modules/customer/customer_controller'

const customerController = new CustomerController()

export default (router: Router): void => {
  router.post('/customers', customerController.add)
  router.get('/customers', customerController.load)
  router.post('/customers/:id', customerController.update)
}
