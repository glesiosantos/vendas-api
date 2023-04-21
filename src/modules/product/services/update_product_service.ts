import { AppDataSource } from "src/config/app_data_source";
import { Product } from "../model/product";
import AppError from "src/shared/erros/app_error";

type UpdateProduct = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export class UpdateProductService {
  async updateProduct (updateProduct: UpdateProduct, id: string): Promise<void> {
    const productRepository = AppDataSource.getRepository(Product)

    const product = await productRepository.findOne({ where: { id } })

    if (!product) throw new AppError('Product not found')

    product.name = updateProduct.name
    product.description = updateProduct.description
    product.price = updateProduct.price
    product.quantity = updateProduct.quantity
    product.updateAt = new Date()
    productRepository.createQueryBuilder().update(Product).set(product).where('id = :id', { id }).execute()
  }
}
