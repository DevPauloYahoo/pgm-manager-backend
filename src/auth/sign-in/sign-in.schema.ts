import { z } from 'zod';

export const singInSchema = z.object({
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório'),
});
