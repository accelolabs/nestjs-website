import { UserRole } from 'src/users/enums/user-role.enum';

export interface JwtUser {
  id: string;
  email: string;
  role: UserRole;
}
