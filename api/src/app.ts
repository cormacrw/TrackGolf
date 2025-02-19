import 'express-async-errors'
import express, { json, Request, Response } from 'express'
import cors from 'cors'
import supertokens from 'supertokens-node'
import { middleware, errorHandler } from 'supertokens-node/framework/express'
import { init as initAuth } from './lib/auth/auth'
import router from './api/routes'
import helmet from 'helmet'
import logger from '@/logger'

initAuth()

const app = express()

app.use('/', (req, _, next) => {
	logger.info(`REQUEST: ${req.method} ${req.url}`)
	next()
})

app.use(
	cors({
		origin: [process.env.CLIENT_CORS_ORIGIN!],
		allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
		credentials: true,
	}),
)

app.use(middleware())

app.use(errorHandler())

app.use(json())
app.use(helmet())

app.use('/api', router())

app.get('/hello', (_: Request, res: Response) => {
	res.status(200).json({ message: 'hello world!' })
})

app.use((_: Request, res: Response) => {
	res.status(404).json({ error: 'NOT FOUND' })
})


export { app }
