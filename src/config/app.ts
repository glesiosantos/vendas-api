import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import AppError from 'src/shared/erros/app_error'
import routerSetup from './routes'

const app = express()

app.use(cors())
app.use(express.json())
routerSetup(app)


app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'Server Internal Error', message: 'error.message' })
})

export default app
