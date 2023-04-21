import { AppDataSource } from "src/config/app_data_source";
import { Product } from "../model/product";

export default class LoadProductService {
  async load (): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product)
    return await productRepository.find()
  }

}
