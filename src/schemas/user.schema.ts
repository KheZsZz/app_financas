import { z } from 'zod';

export const UserSchema = z.object({
  id_user: z.string().uuid({ message: "ID inválido" }),

  name_user: z.string()
  .trim()
  .min(3, "O nome deve ter pelo menos 3 caracteres")
  .max(100)
  .refine((fullname) => {
      const words = fullname.split(/\s+/).filter(word => word.length > 0);
      return words.length >= 2;
    }, {
      message: "Por favor, insira seu nome completo (nome e sobrenome)"
    }),
    
  email_user: z.string()
    .trim()
    .toLowerCase()
    .email("Formato de e-mail inválido")
    .max(255, "O e-mail é muito longo")
    .refine((email) => {
      const blacklistedDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com'];
      const domain = email.split('@')[1];
      return !blacklistedDomains.includes(domain);
    }, {
      message: "Por favor, use um provedor de e-mail confiável"
    }),

  phone_user: z.string()
    .trim()
    .regex(/^\(\d{2}\)\s\d\.\d{4}-\d{4}$/, "Telefone deve seguir o padrão (11) 9.9577-8573")
});

// Tipo TypeScript extraído do Schema
export type UserType = z.infer<typeof UserSchema>;