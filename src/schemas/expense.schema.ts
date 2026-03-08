import {z} from 'zod';

export const ExpenseSchema = z.object({
  id_cost: z.string().uuid().optional(),
  date_cost: z.coerce.date(),
  name_cost: z.string().min(5, "Nome da despesa é obrigatório"),
  describe_cost: z.string().min(5, "obrigatório a descrição da despesa"),
  value_expenses: z.number().positive("O valor deve ser maior que zero"),
  account_id: z.string().uuid(),
  category_id: z.string().uuid(),
  created_at: z.date().optional(),
});

export type ExpensesType = z.infer<typeof ExpenseSchema>;