import { z } from 'zod';

import { roleSchema } from '../role/role.schema';

export const userCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(6, 'Nome deve ter no mínimo 6 caracteres'),
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório')
    .min(6, 'deve ter no mínimo 6 caracteres'),
  roles: z.array(roleSchema).optional(),
});

export const userSchema = z.object({
  id: z.string().uuid('ID com formato incorreto').optional(),
  name: z
    .string({ required_error: 'Nome é obrigatório' })
    .min(1, 'Nome é obrigatório')
    .min(6, 'Nome deve ter no mínimo 6 caracteres'),
  email: z
    .string({ required_error: 'Email é obrigatório' })
    .min(1, 'Email é obrigatório')
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .min(1, 'Senha é obrigatório')
    .min(6, 'deve ter no mínimo 6 caracteres'),
  roles: z.array(roleSchema).optional(),
});
