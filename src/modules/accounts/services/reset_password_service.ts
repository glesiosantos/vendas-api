import { addHours, isAfter } from 'date-fns'
import bcrypt from 'bcryptjs'
import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import { AccountToken } from '../model/account_token'
import AppError from 'src/shared/erros/app_error'

type ResetRequest = {
  token: string
  password: string
}

export class ResetPasswordService {
  async resetPassword (request: ResetRequest): Promise<void> {
    const accountRepository = AppDataSource.getRepository(Account)
    const accountTokenRepository = AppDataSource.getRepository(AccountToken)

    const accountToken = await accountTokenRepository.findOneBy({ token: request.token })
    if (!accountToken) throw new AppError('Token not found with e-mail')

    if (isAfter(Date.now(), addHours(accountToken.createdAt, 2))) throw new AppError('Token expired')

    const account = await accountRepository.findOneBy({ id: accountToken.accountId })
    if (!account) throw new AppError('Account not found')
    account.password = await bcrypt.hash(request.password, 8)
    await accountRepository.createQueryBuilder().update(Account)
      .set(account).where('id = :id', { id: accountToken.accountId })
      .execute()
  }
}
