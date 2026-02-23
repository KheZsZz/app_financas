import { Request, Response, NextFunction } from 'express';
import { userService } from '@/services/userService';

export const userController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error); // Envia para o middleware de erro global
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { nome, email } = req.body;
      const newUser = await userService.createUser(nome, email);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
};  