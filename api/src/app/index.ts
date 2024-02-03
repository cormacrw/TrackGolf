import 'dotenv/config'
import express, {json} from 'express'
import router from 'routers/router'
/**
 * initializes express app
 */
const app = express()

app.use(json())

app.use('/api', router)

export default app