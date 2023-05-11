import { AppDataSource } from 'src/config/app_data_source'
import { AccountToken } from '../model/account_token'
import AppError from 'src/shared/erros/app_error'

export class LoadAccountTokenByIdService {
  async load (accountId: string): Promise<AccountToken> {
    const accountTokenRepository = AppDataSource.getRepository(AccountToken)
    const existAccountToken = await accountTokenRepository.findOne({ where: { accountId } })
    if (!existAccountToken) throw new AppError('Token not found')
    return existAccountToken
  }
}
