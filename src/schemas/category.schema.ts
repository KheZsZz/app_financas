import { z } from 'zod';

import { TypesCategorysEnum } from '@/schemas/enum.schema'



export const CategorySchema = z.object({
  id_category: z.string().uuid(),
  user_id: z.string().uuid(),
  category_name: z.string().min(5, "Nome da categoria é obrigatório"),
  type_category: TypesCategorysEnum.default('Variable'),
  category_describe: z.string().min(10, "Descreva a usabilidade da categoria"),
  created_at: z.date().optional(),
});

export const RequestCategory = CategorySchema.omit({
  id_category:true,
  created_at:true,  
  user_id:true
})

export type CategoryType = z.infer<typeof CategorySchema>;