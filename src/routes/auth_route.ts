import { type Router } from 'express'
import { AuthController } from 'src/modules/auth/auth_controller'

const authController = new AuthController()

export default (router: Router): void => {
  // router.post('/signin')
  router.post('/signup', authController.signup)
}
