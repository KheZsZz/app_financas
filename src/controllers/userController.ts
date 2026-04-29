import { Request, Response, NextFunction } from 'express';
import { RegisterUserSchema, UserType } from '@/schemas/user.schema';
import { supabase } from '@/config/supabase';
import { AuthRequest } from '@/middlewares/auth';

export const userController = {

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email_user, password_user } = req.body; 
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email_user,
        password: password_user,
      });  
      if (error) return res.status(400).json({ error: error.message });

      return res.status(200).json({ 
        message: "Login bem-sucedido!", 
        session: data.session,
        user: data.user
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id_user', userId)
        .single();

      if (error) return next(new Error('Perfil não encontrado'));

      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = RegisterUserSchema.parse(req.body);

      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email_user,
        password: validatedData.password_user,
        options: {
          data: {
            name: validatedData.name_user,
            phone: validatedData.phone_user,
            profile: validatedData.profile_user
          }
        }
      });

      if (error) return res.status(400).json({ error: error.message });

      return res.status(201).json({ 
        message: "Usuário criado! Verifique seu e-mail.", 
        session:data.session
      });
    } catch (error) {
      next(error);
    }
  },

async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const { name_user, phone_user } = req.body;

      const { data, error } = await supabase
        .from('users')
        .update({ name_user, phone_user })
        .eq('id_user', userId)
        .select();

      if (error) return res.status(400).json({ error: error.message });

      return res.json(data[0]);
    } catch (error) {
      next(error);
    }
  },
};  