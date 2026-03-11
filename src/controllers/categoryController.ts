import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middlewares/auth'
import { supabase } from '@/config/supabase';
import { RequestCategory } from '@/schemas/category.schema'

export const categoryController = {

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const user_id = req.user?.id;
        const { data, error, status } = await supabase.from('categorys').select('*').eq('user_id', user_id);
        if (error) return next(error)
        return res.status(status).json(data);
    } catch (error) {
        next(error); 
    }
  },

  async create(req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const user_id = req.user?.id;
      const {category_describe, category_name, type_category } = RequestCategory.parse(req.body)

      const { data, error, status } = await supabase
        .from('categorys')
        .insert({category_describe, category_name, type_category, user_id})
        .select();

      if (error) throw error; 
  
      return res.status(status).json({message: 'Category created successfully'}); 
    } catch (error) {
      next(error)
    }
  },

  async delete (req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const { id }  = req.params;
      const {error, status} = await supabase.from('categorys')
        .delete()
        .eq('id_category', id)
        .eq('user_id', req.user?.id)
      
      if(error) return next(error);

      return res.status(status).json({message:'Category deleted'});
    } catch (error) {
      next(error)
    }
  },

  async update (req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const { category_describe, category_name, type_category } = RequestCategory.parse(req.body);

      const {error, status} = await supabase.from('categorys')
        .update({category_describe, category_name, type_category})
        .eq('id_category', id)
        .eq('user_id', req.user?.id)
      
      if(error) return next(error);

      return res.status(status).json({message:'Category deleted'});
    } catch (error) {
      next(error)
    }
  }

}