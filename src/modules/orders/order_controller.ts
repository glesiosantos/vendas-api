import { Request, Response } from 'express'
import { CreateOrderService } from './services/create_order_service'

export class OrderController {
  async register (req: Request, res: Response): Promise<Response> {
    const createOrderService = new CreateOrderService()
    await createOrderService.add(req.body)
    return res.status(201).send()
  }
}
