import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';
import type { JwtUser } from './interfaces/jwt-user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const handlerRoles = Reflect.getMetadata(ROLES_KEY, context.getHandler()) as
      | UserRole[]
      | undefined;
    const classRoles = Reflect.getMetadata(ROLES_KEY, context.getClass()) as
      | UserRole[]
      | undefined;
    const requiredRoles = handlerRoles ?? classRoles;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const user = request?.user as JwtUser | undefined;

    if (!user) {
      return false;
    }

    return requiredRoles.includes(user.role);
  }
}
