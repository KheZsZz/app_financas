import { supabase } from '@/config/supabase';
import { CategorySchema, CategoryType } from '@/schemas/category.schema';

export const categoryService = {

  async getAllcategorys(user_id:string):Promise<CategoryType []> {
    const { data, error } = await supabase.from('categorys')
        .select('*, profile:user_id(profile_user)')
        .eq('user_id', user_id);
    if (error) throw new Error(error.message);
    return data;
  },
};