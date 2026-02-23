import { Router } from 'express';
import { userController } from '@/controllers/userController';

const router = Router();

// O caminho aqui é relativo ao que for definido no index.ts
router.get('/', userController.list);
router.post('/', userController.create);

export default router;