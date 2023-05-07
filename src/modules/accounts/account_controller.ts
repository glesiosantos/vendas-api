import { type Request, type Response } from 'express'
import { LoadAllAccountService } from './services/load_all_account_service'
import { LoadAccountByEmailService } from './services/load_account_by_email_service'
import { LoadAccountByIdService } from './services/load_account_by_id_service'

export class AccountController {
  async loadAccountsRegistered (req: Request, res: Response): Promise<Response> {
    const accountService = new LoadAllAccountService()
    console.log('************************ ', req.account.id)
    const accounts = await accountService.loadAll()
    return res.status(200).json(accounts)
  }

  async loadAccountsByEmail (req: Request, res: Response): Promise<Response> {
    const accountService = new LoadAccountByEmailService()
    const account = await accountService.load(req.body.email)
    return res.status(200).json(account)
  }

  async loadAccountsById (req: Request, res: Response): Promise<Response> {
    const accountService = new LoadAccountByIdService()
    const account = await accountService.load(req.params.id)
    return res.status(200).json(account)
  }
}
