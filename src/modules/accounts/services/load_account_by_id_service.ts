import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import AppError from 'src/shared/erros/app_error'

export class LoadAccountByIdService {
  async load (id: string): Promise<Account | undefined> {
    const accountRepository = AppDataSource.getRepository(Account)
    const existAccount = await accountRepository.findOne({ where: { id } })
    if (!existAccount) throw new AppError('Account not found')
    return existAccount
  }
}
