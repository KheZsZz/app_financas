import { z } from 'zod';
import { CoinsEnum } from '@/schemas/enum.schema'


export const BankSchema = z.object({
  id_bank: z.string().uuid().optional(),
  name_bank: z.string().min(1, "Nome do banco é obrigatório"),
  cnpj: z
    .string()
    .length(14, "CNPJ deve ter exatos 14 números")
    .regex(/^\d+$/, "Envie apenas números")
    .transform((val) => 
      val.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
    ),
  icon_link: z.string().url("Link do ícone deve ser uma URL válida"),
});

export const AccountSchema = z.object({
  id_account: z.string().uuid(),
  bank_id: z.string().uuid("ID do banco inválido"),
  agency: z.string().nullable().optional(),
  account: z.string().nullable().optional(),
  user_id: z.string().uuid("ID do usuário inválido"),
  coin: CoinsEnum.default('BRL'),
  score: z.number().default(0.00),
});


export type BankType = z.infer<typeof BankSchema>;