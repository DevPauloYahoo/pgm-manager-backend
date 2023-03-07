import { z } from 'zod';

const rolesEnum = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  GUEST: 'ROLE_GUEST',
} as const;

export const createRoleSchema = z.object({
  name: z.nativeEnum(rolesEnum, {
    invalid_type_error: 'Dados incorretos',
    required_error: 'Nome é obrigatório',
  }),
  // users: z.array(userSchema).optional(),
});

export const roleSchema = z.object({
  // id: z.string().uuid('ID com formato incorreto').optional(),
  name: z.nativeEnum(rolesEnum, {
    invalid_type_error: 'Dados incorretos',
    required_error: 'Nome é obrigatório',
  }),
});
