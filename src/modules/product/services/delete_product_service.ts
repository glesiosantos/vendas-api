import { AppDataSource } from 'src/config/app_data_source'
import { Product } from '../model/product'
import AppError from 'src/shared/erros/app_error'

export class DeleteProductService {
  async deleteProduct (id: string): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOne({ where: { id } })

    if (product == null) throw new AppError('Product not found')
    await productRepository.createQueryBuilder().delete().from(Product).where('id = :id', { id }).execute()
  }
}
