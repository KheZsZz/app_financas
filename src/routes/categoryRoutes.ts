import { Router } from 'express';
import { categoryController } from '@/controllers/categoryController';

const router = Router();

router.get('/', categoryController.list);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.delete);
router.patch('/:id', categoryController.update);

export default router;