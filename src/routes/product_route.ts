import { type Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import ProductController from 'src/modules/product/product_controller'
import isAuthenticated from 'src/shared/middlewares/is_authenticate'

const productController = new ProductController()

export default (router: Router): void => {
  router.post('/products', isAuthenticated, celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      description: Joi.string().required(),
      quantity: Joi.number().required()
    }
  }),
  productController.addProduct)

  router.get('/products/:id', celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }), productController.showProduct)

  router.get('/products', isAuthenticated, productController.loadProduct)
  router.put('/products/:id', productController.updateProduct)

  router.delete('/products/:id', celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required()
    }
  }), productController.deleteProduct)
}
