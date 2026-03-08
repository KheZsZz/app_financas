// Global
import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';

//Routes 
import userRoutes from './userRoutes';
import categoryRoutes from './categoryRoutes'

const router = Router();

// Rotas 
router.use('/users', userRoutes);
router.use('/categorys', categoryRoutes);

export default router;