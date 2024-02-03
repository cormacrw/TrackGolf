import { Router } from 'express';
import publicRouter from './public';
import secureRouter from './secure/router';
const router = Router();
router.use('/api/s', secureRouter);
router.use('/api', publicRouter);
export default router;
