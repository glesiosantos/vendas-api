import { type Router } from 'express'
import multer from 'multer'
import multerConfig from 'src/config/multer_config'
import { AccountController } from 'src/modules/accounts/account_controller'
import isAuthenticated from 'src/shared/middlewares/is_authenticate'

const accountController = new AccountController()

export default (router: Router): void => {
  router.get('/accounts', isAuthenticated, accountController.loadAccountsRegistered)
  router.get('/accounts/load', isAuthenticated, accountController.loadAccountsByEmail)
  router.get('/accounts/load/:id', isAuthenticated, accountController.loadAccountsById)
  router.get('/accounts/profile', isAuthenticated, accountController.loadProfileById)
  router.post('/accounts/profile/update', isAuthenticated, accountController.updateAccount)
  router.patch('/accounts/avatar', isAuthenticated, multer(multerConfig).single('avatar'), accountController.uploadAvatarAccount)
}
