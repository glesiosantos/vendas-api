import { AppDataSource } from 'src/config/app_data_source'
import type Account from '../model/account'
import AppError from 'src/shared/erros/app_error'

export class LoadAllAccountService {
  async loadAll (): Promise<Account[] | null> {
    return new Promise(resolve => { resolve(null) })
  }
}
