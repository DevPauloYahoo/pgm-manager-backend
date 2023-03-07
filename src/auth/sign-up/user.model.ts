import { RoleModel } from '../role/role.model';

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  roles?: RoleModel[];
}
