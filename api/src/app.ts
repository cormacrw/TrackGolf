import 'express-async-errors'
import './data/db'
import express, { json, Request, Response } from 'express'
import cors from 'cors'
import supertokens from 'supertokens-node'
import { middleware, errorHandler } from 'supertokens-node/framework/express'
import { init as initAuth } from './lib/auth/auth'
import router from './api/routes'
import helmet from 'helmet'

initAuth()

const app = express()

app.use(
	cors({
		origin: ['http://localhost:5173', 'http://localhost:4173'],
		allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
		credentials: true,
	}),
)

app.use(middleware())

app.use(errorHandler())

app.use(json())
app.use(helmet())

app.use('/api', router())

app.get('/', (_: Request, res: Response) => {
  res.json({
    msg: 'Hello World',
  })
})

app.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'NOT FOUND' })
})


export { app }
