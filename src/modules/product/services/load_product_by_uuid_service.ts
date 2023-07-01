import { AppDataSource } from 'src/config/app_data_source'
import { Product } from '../model/product'

export default class LoadByUuidProductService {
  async loadById (id: string): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository(Product)
    const product = await productRepository.findOneBy({ id })
    return (product == null) ? null : product
  }
}
