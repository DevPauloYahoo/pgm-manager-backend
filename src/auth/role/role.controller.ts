import { Request, Response } from 'express';

import { roleService } from '../auth.module';
import { createRoleSchema } from './role.schema';

export const createRole = async (req: Request, res: Response) => {
  createRoleSchema.parse(req.body);
  const { ...role } = req.body;

  const roleCreated = await roleService.createRole({ ...role });

  return res.status(200).json(roleCreated);
};
