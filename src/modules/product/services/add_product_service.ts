import { AppDataSource } from "src/config/app_data_source";
import { Product } from "../model/product";
import AppError from "src/shared/erros/app_error";

type AddProduct = {
  name: string
  description: string
  price: number
  quantity: number
}

export class AddProductService {
  async saveProduct (addProduct: AddProduct): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product)


    const existProduct = await productRepository.findOneBy({ name: addProduct.name })

    if (existProduct) throw new AppError('Product already in database')

    const product = productRepository.create({ name: addProduct.name, description: addProduct.description, price: addProduct.price, quantity: addProduct.quantity })
    return await productRepository.save(product)
  }
}
