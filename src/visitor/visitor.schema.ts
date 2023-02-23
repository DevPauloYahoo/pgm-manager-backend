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

export const createVisitorWithVisitSchema = z.object({
  name: z
    .string({ required_error: 'Nome do visitante é obrigatório' })
    .min(1, 'Nome do visitante é obrigatório')
    .min(6, 'Nome deve conter no mínimo 6 caracteres'),

  document: z
    .string({ required_error: 'CPF do visitante é obrigatório' })
    .min(1, 'CPF do visitante é obrigatório')
    .min(11, 'Informe somente os números do CPF (Ex: 24556790109)')
    .max(11, 'Informe somente os números do CPF (Ex: 24556790109)'),

  visit: z.object({
    badge: z
      .string({ required_error: 'Crachá é obrigatório' })
      .min(1, 'Crachá é obrigatório')
      .min(2, 'Crachá deve ser informado com dois dígitos. Ex: 01, 02...')
      .max(2, 'Crachá deve ter no máximo dois dígitos'),

    secretary: z
      .string({ required_error: 'Secretaria é obrigatório' })
      .min(1, 'Secretaria é obrigatório'),

    status: z.boolean().optional(),
  }),
});

export const validationCPFNumber = z.number({
  required_error: 'CPF do visitante é obrigatório',
  invalid_type_error: 'CPF deve conter caracteres exclusivamente numéricos',
});

export const validationCPFString = z
  .string()
  .min(1, 'CPF do visitante é obrigatório')
  .min(11, 'CPF deve ter 11 caracteres exclusivamente numéricos')
  .max(11, 'CPF deve ter 11 caracteres exclusivamente numéricos');
