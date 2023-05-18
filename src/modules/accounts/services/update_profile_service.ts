import bcrypt from 'bcryptjs'
import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import AppError from 'src/shared/erros/app_error'

type UpdateAccountModel = {
  id: string
  name: string
  oldPassword?: string
  newPassword?: string
}

export class UpdateProfileService {
  async update (updateAccount: UpdateAccountModel): Promise<void> {
    const accountRepository = AppDataSource.getRepository(Account)
    const account = await accountRepository.findOneBy({ id: updateAccount.id })

    if (!account) throw new AppError('Account not found')

    account.name = updateAccount.name
    account.updatedAt = new Date()

    if (updateAccount.oldPassword && updateAccount.newPassword) {
      const verifyPasswd = await bcrypt.compare(updateAccount.oldPassword, account.password)
      if (verifyPasswd) {
        account.password = await bcrypt.hash(updateAccount.newPassword, 8)
      } else {
        throw new AppError('Old password is fails')
      }
    }

    await accountRepository.createQueryBuilder().update(Account).set(account)
      .where('id = :id', { id: updateAccount.id }).execute()
  }
}
