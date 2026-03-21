import { Response, NextFunction } from 'express';
import { AuthRequest } from '@/middlewares/auth'
import { supabase } from '@/config/supabase';
import { BankSchema } from '@/schemas/bank.schema'


export const bankController = {

  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const { data, error, status } = await supabase.from('banks').select('*');
        if (error) return next(error)
        return res.status(status).json(data);
    } catch (error) {
        next(error); 
    }
  },

  async create(req:AuthRequest, res:Response, next:NextFunction) {
    try {
      const { cnpj, name_bank } = BankSchema.parse(req.body)

      const { data, error, status } = await supabase
        .from('categorys')
        .insert({cnpj, name_bank})
        .select();

      if (error) throw error; 
  
      return res.status(status).json({message: 'Bank created successfully'}); 
    } catch (error) {
      next(error)
    }
  },

  async delete (req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const { id }  = req.params;
        const {error, status} = await supabase.from('banks')
            .delete()
            .eq('id_bank', id)
        
        if(error) return next(error);

        return res.status(status).json({message:'bank deleted'});
    } catch (error) {
      next(error)
    }
  },

  async update (req:AuthRequest, res:Response, next:NextFunction) {
    try {
        const { id } = req.params;
        const bank = BankSchema.parse(req.body);

        const {error, status} = await supabase.from('banks')
            .update(bank)
            .eq('id_bank', id)
        
        if(error) return next(error);

        return res.status(status).json({message:'bank updated'});
    } catch (error) {
      next(error)
    }
  }
}