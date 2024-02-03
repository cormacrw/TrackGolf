import 'dotenv/config';
import 'express-async-errors';
import express, { json } from 'express';
import { errorMiddleware, loggerMiddleware } from '../middleware';
import router from '../routers/router';
/**
 * initializes express app
 */
const app = express();
app.use(json());
loggerMiddleware.register(app);
app.use(router);
errorMiddleware.register(app);
export default app;
