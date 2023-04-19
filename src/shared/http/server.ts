import express, { type NextFunction, type Request, type Response, response } from 'express'
import cors from 'cors'
import routes from './routers'
import AppError from '../erros/app_error'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message })
  }

  return response.status(500).json({ status: 'Server Internal Error', message: 'error.message' })
})

app.listen(3000, () => { console.log('Server start on port 3000') })
