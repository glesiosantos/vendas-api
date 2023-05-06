import bcrypt from 'bcryptjs'
import { AppDataSource } from 'src/config/app_data_source'
import Account from 'src/modules/accounts/model/account'
import AppError from 'src/shared/erros/app_error'

type Register = {
  name: string
  email: string
  password: string
  isAdmin: boolean
}

export class AuthRegister {
  async register (register: Register): Promise<Account | null> {
    const accountRepository = AppDataSource.getRepository(Account)
    const existAccount = await accountRepository.findOneBy({ email: register.email })
    if (existAccount) throw new AppError('Account already registered')

    const hash = await bcrypt.hash(register.password, 8)
    const account = accountRepository.create(Object.assign(register, { password: hash }))
    return await accountRepository.save(account)
  }
}
