import { z } from 'zod';

export const createVisitSchema = z.object({
  badge: z
    .string({ required_error: 'Crachá é obrigatório' })
    .min(1, 'Crachá é obrigatório')
    .min(2, 'Crachá deve ser informado com dois dígitos. Ex: 01, 02...')
    .max(2, 'Crachá deve ter no máximo dois dígitos'),

  secretary: z
    .string({ required_error: 'Secretaria é obrigatório' })
    .min(1, 'Secretaria é obrigatório'),

  status: z.boolean().optional(),

  visitor_id: z
    .string({ required_error: 'ID do visitante é obrigatório' })
    .min(1, 'ID do visitante é obrigatório')
    .uuid({ message: 'ID informado é inválido' }),
});

export const createVisitToVisitorSchema = z.object({
  badge: z
    .string({ required_error: 'Crachá é obrigatório' })
    .min(1, 'Crachá é obrigatório')
    .min(2, 'Crachá deve ser informado com dois dígitos. Ex: 01, 02...')
    .max(2, 'Crachá deve ter no máximo dois dígitos'),

  secretary: z
    .string({ required_error: 'Secretaria é obrigatório' })
    .min(1, 'Secretaria é obrigatório'),

  status: z.boolean().optional(),
});

export const validationParamsVisitorSchema = z.object({
  id: z.string({ required_error: 'ID do visitante é obrigatório' }).uuid({
    message: 'ID informado é invalido',
  }),
});
