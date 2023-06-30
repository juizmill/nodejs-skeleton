import express, { NextFunction, Request, Response, Router } from 'express'
import cors from 'cors'
import AppError from '@errors/AppError'
import fs from 'fs'
import path from 'path'

const app = express()

app.use(cors())
app.use(express.json())

const routes = Router()
const dirs = fs.readdirSync(path.resolve(__dirname))

dirs.forEach((module) => {
  const fullPath = path.join(path.resolve(__dirname), module)

  if (fs.statSync(fullPath).isDirectory()) {
    if (!fs.existsSync(`${fullPath}/routes.ts`)) {
      throw new Error(`The routes.ts file is missing in module ${module}`)
    }

    const route = require(`./${module}/routes`).default
    routes.use(route)
  }
})

app.use(routes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

export default app
