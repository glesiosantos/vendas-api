import express, { type NextFunction, type Request, type Response } from 'express'
import cors from 'cors'
import 'express-async-errors'
import { errors } from 'celebrate'
import AppError from 'src/shared/erros/app_error'
import routerSetup from './routes'
import multerConfig from './multer_config'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(multerConfig.directory))
routerSetup(app)
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'Server Internal Error', message: error.message })
})

export default app
