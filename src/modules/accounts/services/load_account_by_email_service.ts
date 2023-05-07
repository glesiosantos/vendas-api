import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import AppError from 'src/shared/erros/app_error'

export class LoadAccountByEmailService {
  async load (email: string): Promise<Account | undefined> {
    const accountRepository = AppDataSource.getRepository(Account)
    const existAccount = await accountRepository.findOne({ where: { email } })
    if (!existAccount) throw new AppError('Account not found')
    return existAccount
  }
}
