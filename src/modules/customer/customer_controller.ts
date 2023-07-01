import { type Request, type Response } from 'express'
import { AddCustomerService } from './services/add_customer_service'
import { ListCustomerService } from './services/list_customer_service'
import { UpdateCustomerService } from './services/update_customer_service'
import { readdirSync } from 'fs'

export class CustomerController {
  async add (req: Request, res: Response): Promise<Response> {
    const customerService = new AddCustomerService()
    await customerService.add(req.body)
    return res.status(201).send()
  }

  async load (req: Request, res: Response): Promise<Response> {
    const customService = new ListCustomerService()
    const customers = await customService.load()
    return res.status(200).json(customers)
  }

  async update (req: Request, res: Response): Promise<Response> {
    const customerService = new UpdateCustomerService()
    await customerService.update({ ...req.body, id: req.params.id })
    return res.status(204).send()
  }
}
