import { type Request, type Response } from 'express'
import { AuthRegister } from './services/register_service'
import { AuthenticationService } from './services/authentication_service'

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
}
