import bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { AppDataSource } from 'src/config/app_data_source'
import env from 'src/config/env'
import Account from 'src/modules/accounts/model/account'
import AppError from 'src/shared/erros/app_error'

type Authenticate = {
  email: string
  password: string
}

type AccountAuthenticate = {
  token: string
}

export class AuthenticationService {
  async authenticate (authenticate: Authenticate): Promise<AccountAuthenticate> {
    const accountRepository = AppDataSource.getRepository(Account)
    const account = await accountRepository.findOneBy({ email: authenticate.email })

    if (!account) throw new AppError('Account not already registered', 401)

    const compared = await bcrypt.compare(authenticate.password, account.password)
    if (!compared) throw new AppError('Password is fails', 401)

    const token = sign({}, env.apiSecret, {
      subject: account.id,
      expiresIn: '1d'
    })

    return { token }
  }
}
