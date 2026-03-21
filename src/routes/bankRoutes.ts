import { Router } from 'express';
import { bankController } from '@/controllers/bankController';

const router = Router();

router.get('/', bankController.list);
router.post('/', bankController.create);
router.delete('/:id', bankController.delete);
router.patch('/:id', bankController.update);

export default router;