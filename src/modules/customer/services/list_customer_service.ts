import { AppDataSource } from 'src/config/app_data_source'
import { Customer } from '../model/customer'

export class ListCustomerService {
  async load (): Promise<Customer[]> {
    const customerRepository = AppDataSource.getRepository(Customer)
    const customers = await customerRepository.createQueryBuilder('customer').take(5).getMany()
    return customers
  }
}
