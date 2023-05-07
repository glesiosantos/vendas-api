import { type Router } from 'express'
import multer from 'multer'
import multerConfig from 'src/config/multer_config'
import { AccountController } from 'src/modules/accounts/account_controller'
import isAuthenticated from 'src/shared/middlewares/is_authenticate'

const accountController = new AccountController()

export default (router: Router): void => {
  router.get('/accounts', isAuthenticated, accountController.loadAccountsRegistered)
  router.get('/accounts/load', accountController.loadAccountsByEmail)
  router.get('/accounts/load/:id', accountController.loadAccountsById)
  router.patch('/accounts/avatar', isAuthenticated, multer(multerConfig).single('avatar'), accountController.uploadAvatarAccount)
}
