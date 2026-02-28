import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
