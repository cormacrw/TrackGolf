import { Router } from 'express'
import publicRouter from './public';
import secureRouter from './secure';

const router = Router()

router.use('/s', secureRouter)
router.use('/', publicRouter)

export default router