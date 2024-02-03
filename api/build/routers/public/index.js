import { Router } from 'express';
import test from './test/test';
const publicRouter = Router();
test.register(publicRouter);
export default publicRouter;
