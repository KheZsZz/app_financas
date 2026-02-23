import { z } from 'zod';

export const CreatePostSchema = z.object({
  title: z.string().min(5, "Título muito curto").max(100),
  content: z.string().min(10, "Conteúdo deve ser mais detalhado"),
  is_public: z.boolean().default(true)
});

// Extraindo o tipo para usar na tipagem da rota
export type CreatePostInput = z.infer<typeof CreatePostSchema>;