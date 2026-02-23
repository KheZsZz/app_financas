import { Request, Response, NextFunction } from 'express';
import { usersService } from '@/services/userService';
import { UserType } from '@/schemas/user.schema';

export const userController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error); // Envia para o middleware de erro global
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user:UserType = req.body;
      const newUser = await usersService.createUser(user);
      if(newUser){
        res.status(201).json({sucess:true});
      }
    } catch (error) {
      next(error);
    }
  },

  async update (req: Request, res:Response, next:NextFunction){
    const { id } = req.params;
    const user:UserType = req.body;

    try {
      const updateUser  = await usersService.updateUserFields(id as string, user)
      return res.status(201).json(updateUser)
    } catch (error:any) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete (req: Request, res:Response, next:NextFunction){
    const { id } = req.params;
    await usersService.deleteUserFields(id as string)
    return res.status(200).json(id)
  }
};  