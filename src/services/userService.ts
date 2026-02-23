import { supabase } from '@/config/supabase';

export const userService = {
  async getAllUsers() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async createUser(nome: string, email: string) {
    const { data, error } = await supabase
      .from('users')
      .insert([{ nome, email }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
};