import { z } from "zod";
import { ProfileStatusEnum, blacklistedDomains } from "@/schemas/enum.schema";

export const UserSchema = z.object({
  id_user: z.string().uuid({ message: "ID inválido" }),

  name_user: z
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(100)
    .refine(
      (fullname) => {
        const words = fullname.split(/\s+/).filter((word) => word.length > 0);
        return words.length >= 2;
      },
      {
        message: "Por favor, insira seu nome completo (nome e sobrenome)",
      },
    ),

  email_user: z
    .string()
    .trim()
    .toLowerCase()
    .email("Formato de e-mail inválido")
    .max(255, "O e-mail é muito longo")
    .refine(
      (email) => {
        const domain = email.split("@")[1];
        return !blacklistedDomains.includes(domain);
      },
      {
        message: "Por favor, use um provedor de e-mail confiável",
      },
    ),

  password_user: z
    .string()
    .trim()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^a-zA-Z0-9]/,
      "A senha deve conter pelo menos um caractere especial",
    ),

  profile_user: ProfileStatusEnum.default("commum"),

  created_at: z.date().optional(),

  phone_user: z
    .string()
    .trim()
    .regex(
      /^\(\d{2}\)\s\d\.\d{4}-\d{4}$/,
      "Telefone deve seguir o padrão (99) 9.9999-9999",
    ),
});

export const RegisterUserSchema = UserSchema.omit({
  id_user: true,
  created_at: true,
});

export const LoginUserSchema = UserSchema.pick({
  email_user: true,
  password_user: true,
});
export type LoginFormData = z.infer<typeof LoginUserSchema>;

export type UserType = z.infer<typeof UserSchema>;
