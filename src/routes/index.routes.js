import { Router } from 'express';
import { indexPing } from '../controllers/index.controller.js';

const router = Router()

router.get('/ping', indexPing)


 export default router