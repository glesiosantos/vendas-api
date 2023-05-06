import { type Router } from 'express'
import { AccountController } from 'src/modules/accounts/account_controller'

const accountController = new AccountController()

export default (router: Router): void => {
  router.get('/accounts', accountController.loadAccountsRegistered)
  router.get('/accounts/load', accountController.loadAccountsByEmail)
  router.get('/accounts/load/:id', accountController.loadAccountsById)
}
