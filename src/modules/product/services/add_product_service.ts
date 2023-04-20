import { AppDataSource } from "src/config/app_data_source";
import { Product } from "../model/product";

type AddProduct = {
  name: string
  description: string
  price: number
}

export class AddProductService {
  async saveProduct (addProduct: AddProduct): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product)
    return await productRepository.save(addProduct)
  }
}
