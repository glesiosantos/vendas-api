import { type Request, type Response } from 'express'
import { AuthRegister } from './services/register_service'
import { AuthenticationService } from './services/authentication_service'
import { ResetPasswordService } from '../accounts/services/reset_password_service'
import { SendForgotPasswordEmailService } from '../accounts/services/send_forgot_password_email_service'

export class AuthController {
  async signin (req: Request, res: Response): Promise<Response> {
    const authService = new AuthenticationService()
    const authenticate = await authService.authenticate(req.body)
    return res.status(200).json(authenticate)
  }

  async signup (req: Request, res: Response): Promise<Response> {
    const authService = new AuthRegister()
    await authService.register(req.body)
    return res.status(204).send()
  }

  async forgot (req: Request, res: Response): Promise<Response> {
    const sendForgotService = new SendForgotPasswordEmailService()
    await sendForgotService.sendEmail(req.body.email)
    return res.status(204).send()
  }

  async reset (req: Request, res: Response): Promise<Response> {
    const resetPasswdService = new ResetPasswordService()
    await resetPasswdService.resetPassword(req.body)
    return res.status(204).send()
  }
}
