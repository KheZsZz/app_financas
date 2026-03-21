// Global
import { Router } from 'express';
import { authMiddleware } from '@/middlewares/auth';

//Routes 
import userRoutes from '@/routes/userRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import bankRoutes from '@/routes/bankRoutes'; 
import expenseRoutes from "@/routes/expenseRoute";


const router = Router();

// Rotas 
router.use('/users', userRoutes);
router.use('/categorys', authMiddleware, categoryRoutes);
router.use('/banks', authMiddleware, bankRoutes);
router.use('/expenses', authMiddleware, expenseRoutes);

export default router;