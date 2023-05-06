import { verify } from 'jsonwebtoken'
import { type NextFunction, type Request, type Response } from 'express'
import AppError from 'src/shared/erros/app_error'
import env from 'src/config/env'

export default function isAuthenticated (req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization
  console.log(authHeader)
  if (!authHeader) throw new AppError('JWT token is missing.', 401)

  const [,token] = authHeader.split(' ')

  try {
    const decode = verify(token, env.apiSecret)
    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
