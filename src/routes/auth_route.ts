import { Joi, Segments, celebrate } from 'celebrate'
import { type Router } from 'express'
import { AuthController } from 'src/modules/auth/auth_controller'
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute'

const authController = new AuthController()

export default (router: Router): void => {
  router.post('/signin', authController.signin)
  router.post('/signup', authController.signup)
  router.post('/forgot', celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required()
    }
  }), authController.forgot)
  router.post('/reset', celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      token: Joi.string().required()
    }
  }), authController.reset)
}
