import { Router, request, response } from "express";
import ProductController from "src/modules/product/product_controller";

const productController = new ProductController()

export default (router: Router): void => {
  router.post('/products', productController.addProduct)
  router.get('/products', productController.loadProduct)
}
