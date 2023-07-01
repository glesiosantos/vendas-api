import path from 'path'
import multerConfig from '../../../config/multer_config'
import { AppDataSource } from 'src/config/app_data_source'
import Account from '../model/account'
import AppError from 'src/shared/erros/app_error'
import fs from 'fs'

export class UploadAvatarService {
  async upload (avatar: string = 'default.png', id: string): Promise<void> {
    const accountRepository = AppDataSource.getRepository(Account)
    const account = await accountRepository.findOneBy({ id })

    if (!account) throw new AppError('Account not found')

    if (account.avatar && account.avatar !== 'default.png') {
      const avatarFilePath = path.join(multerConfig.directory, account.avatar)
      const existFile = await fs.promises.stat(avatarFilePath)

      if (existFile) await fs.promises.unlink(avatarFilePath)
    }

    account.avatar = avatar
    await accountRepository.createQueryBuilder().update(Account).set(account)
      .where('id = :id', { id }).execute()
  }
}
