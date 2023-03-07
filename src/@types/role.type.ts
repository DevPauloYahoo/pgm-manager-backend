import { RoleModel } from '../auth/role/role.model';

export type RoleType = Partial<RoleModel>;
export type CreateRoleType = Omit<RoleModel, 'id'>;
