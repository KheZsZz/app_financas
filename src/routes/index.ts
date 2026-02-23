// Global
import { Router } from 'express';

//Routes 
import userRoutes from './userRoutes';

const router = Router();

// Rotas 
router.use('/users', userRoutes);

export default router;