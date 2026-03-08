import { Request, Response, NextFunction } from 'express';
import { categoryService } from '@/services/categoryService';
import { CategoryType } from '@/schemas/category.schema';

export const categoryController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
        const { user_id } = req.body;
        const categorys = await categoryService.getAllcategorys(user_id);
        res.json(categorys);
    } catch (error) {
        next(error); // Envia para o middleware de erro global
    }
  },
}