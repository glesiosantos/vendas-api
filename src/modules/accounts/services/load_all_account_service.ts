import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import AppError from 'src/shared/erros/app_error'

export class LoadAllAccountService {
  async loadAll (): Promise<Account[]> {
    const accountRepository = AppDataSource.getRepository(Account)
    const accounts = await accountRepository.find()
    return accounts
  }
}
