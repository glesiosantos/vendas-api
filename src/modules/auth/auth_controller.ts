import { type Request, type Response } from 'express'
import { AuthRegister } from './services/register_account_service'

export class AuthController {
  async signin (req: Request, res: Response): Promise<Response> {
    return res.status(200).json(null)
  }

  async signup (req: Request, res: Response): Promise<Response> {
    const authService = new AuthRegister()
    await authService.register(req.body)
    return res.status(204).send()
  }
}
