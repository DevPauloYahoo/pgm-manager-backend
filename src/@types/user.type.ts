import { UserModel } from '../auth/sign-up/user.model';

export type UserType = Partial<UserModel>;
export type CreateUserType = Omit<UserModel, 'id'>;
