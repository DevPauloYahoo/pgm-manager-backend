import { z } from 'zod';

export const createVisitorSchema = z.object({
  name: z
    .string({ required_error: 'Nome do visitante é obrigatório' })
    .min(1, 'Nome do visitante é obrigatório')
    .min(6, 'Nome deve conter no mínimo 6 caracteres'),

  document: z
    .string({ required_error: 'CPF do visitante é obrigatório' })
    .min(1, 'CPF do visitante é obrigatório')
    .min(11, 'Informe somente os números do CPF (Ex: 24556790109)')
    .max(11, 'Informe somente os números do CPF (Ex: 24556790109)'),
});
