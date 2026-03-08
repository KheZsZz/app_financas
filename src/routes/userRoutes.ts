import { Router } from 'express';
import { userController } from '@/controllers/userController';


const router = Router();

router.get('/', userController.list);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;