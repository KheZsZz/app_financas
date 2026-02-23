import { supabase } from '@/config/supabase';
import { UserSchema, UserType } from '@/schemas/user.schema';



export const usersService = {

  async getAllUsers():Promise<UserType []> {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data;
  },

  async createUser(userData: Partial<UserType>): Promise<UserType> {
    const validation = UserSchema.omit({ id_user: true }).safeParse(userData);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0].message;
      throw new Error(errorMsg);
    }

    const { data, error } = await supabase
      .from('users')
      .insert([validation.data])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') throw new Error('E-mail ou Telefone já cadastrado.');
      throw new Error(error.message);
    }

    return data as UserType;
  },

  async updateUserFields (id: string, userData: Partial<UserType>):Promise<UserType> {
    const validation = UserSchema.partial().safeParse(userData);

    if (!validation.success) {
      throw new Error(validation.error.issues[0].message);
    }
    const { data, error } = await supabase
    .from('users')
    .update(validation.data)
    .eq('id_user', id)
    .select()
    .single();

    if (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }

    return data as UserType;
  },

  async deleteUserFields (id:string){
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id_user', id);

    if (error) throw new Error(error.message);
  }
};