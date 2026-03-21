import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middlewares/auth'
import { supabase } from '@/config/supabase';
import { ExpenseSchema } from '@/schemas/expense.schema'

export const expenseController = {

  async list(req: AuthRequest, res: Response, next: NextFunction) {
      try {
          const { data, error, status } = await supabase.from('expenses').select('*').eq('user_id', req.user?.id);

          if (error) return next(error)
          
          return res.status(status).json(data);
      } catch (error) {
          next(error); 
      }
  },

  async create(req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const user_id = req.user?.id;
      const expense = ExpenseSchema.parse(req.body)

      const { data, error, status } = await supabase
        .from('expenses')
        .insert({expense, user_id})
        .select();

      if (error) throw error; 
  
      return res.status(status).json({message: 'expense created successfully'}); 
    } catch (error) {
      next(error)
    }
  },

  async delete (req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const { id }  = req.params;
      const {error, status} = await supabase.from('expenses')
        .delete()
        .eq('id_cost', id)
        .eq('user_id', req.user?.id)
      
      if(error) return next(error);

      return res.status(status).json({message:'expense deleted'});
    } catch (error) {
      next(error)
    }
  },

  async update (req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const expense = ExpenseSchema.parse(req.body);

      const {error, status} = await supabase.from('expenses')
        .update(expense)
        .eq('id_cost', id)
        .eq('user_id', req.user?.id)
      
      if(error) return next(error);

      return res.status(status).json({message:'Expense updated'});
    } catch (error) {
      next(error)
    }
  }

}