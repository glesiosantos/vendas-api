import { Request, Response } from 'express'
import { CreateOrderService } from './services/create_order_service'
import { LoadOrder } from './services/load_orders_service'
import { FindOrderByIdService } from './services/find_order_by_id_service'

export class OrderController {
  async register (req: Request, res: Response): Promise<Response> {
    const createOrderService = new CreateOrderService()
    await createOrderService.add(req.body)
    return res.status(201).send()
  }

  async getOrderById (req: Request, res: Response): Promise<Response> {
    const createOrderService = new FindOrderByIdService()
    await createOrderService.load(req.params.id)
    return res.status(200).send()
  }

  async getOrders (req: Request, res: Response): Promise<Response> {
    const createOrderService = new LoadOrder()
    const orders = await createOrderService.load()
    return res.status(200).json(orders)
  }
}
