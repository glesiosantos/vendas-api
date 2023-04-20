import { Response, Request } from "express";
import { AddProductService } from "./services/add_product_service";
import LoadProductService from "./services/load_product_service";

export default class ProductController {
  async addProduct (req: Request, res: Response): Promise<Response> {
    const productService = new AddProductService();
    await productService.saveProduct(req.body)
    return res.status(201).send()
  }

  async loadProduct (req: Request, res: Response): Promise<Response> {
    const loadProductService = new LoadProductService()
    const products = await loadProductService.load()
    return res.status(200).json(products)
  }
}
