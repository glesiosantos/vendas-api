import { type Router } from 'express'
import { CustomerController } from 'src/modules/customer/customer_controller'
import isAuthenticated from 'src/shared/middlewares/is_authenticate'

const customerController = new CustomerController()

export default (router: Router): void => {
  router.post('/customers', isAuthenticated, customerController.add)
  router.get('/customers', isAuthenticated, customerController.load)
  router.post('/customers/:id', isAuthenticated, customerController.update)
}
