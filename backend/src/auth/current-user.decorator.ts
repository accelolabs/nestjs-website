import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtUser } from './interfaces/jwt-user.interface';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtUser => {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req.user;
  },
);
