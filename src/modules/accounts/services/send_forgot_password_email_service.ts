import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import { AccountToken } from '../model/account_token'
import AppError from 'src/shared/erros/app_error'

export class SendForgotPasswordEmailService {
  async sendEmail (email: string): Promise<void> {
    const accountRepository = AppDataSource.getRepository(Account)
    const accountTokenRepository = AppDataSource.getRepository(AccountToken)

    const account = await accountRepository.findOneBy({ email })
    if (!account) throw new AppError('Account not found with e-mail')
    await accountTokenRepository.save({ accountId: account.id })
  }
}
