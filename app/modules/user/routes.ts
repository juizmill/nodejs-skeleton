import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/user', (req: Request, res: Response) => {
  res.json({ message: 'Route User' })
})

export default routes
