import { Router } from 'express';
import { userController } from '@/controllers/userController';
import { authMiddleware } from '@/middlewares/auth';


const router = Router();

router.get('/', authMiddleware, userController.getProfile);
router.post('/', userController.create);
router.patch('/', authMiddleware, userController.update);
router.get('/singIn', userController.signIn);

export default router;