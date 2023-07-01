import { AppDataSource } from 'src/config/app_data_source'
import { Customer } from '../model/customer'

type AddCustomerModel = {
  name: string
  whatsapp: string
}

export class AddCustomerService {
  async add (addCustomer: AddCustomerModel): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customer = customerRepository.create(addCustomer)
    await customerRepository.save(customer)
  }
}
