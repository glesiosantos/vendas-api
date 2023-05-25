import { AppDataSource } from 'src/config/app_data_source'
import Customer from '../model/customer'
import { custom } from 'joi'

type UpdateCustomerModel = {
  id: string
  name?: string
  whatsapp?: string
}

export class UpdateCustomerService {
  async update (customerUpdate: UpdateCustomerModel): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customer = await customerRepository.findOneBy({ id: customerUpdate.id })

    await customerRepository.createQueryBuilder().update(Customer)
      .set({ name: customerUpdate.name, whatsapp: customerUpdate.whatsapp })
      .where('id = :id', { id: customerUpdate.id }).execute()
  }
}
