import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from './current-user.decorator';
import type { JwtUser } from './interfaces/jwt-user.interface';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadDto)
  login(@Args('input') input: LoginDto) {
    return this.authService.login(input);
  }

  @Mutation(() => User)
  registerDummy(
    @Args('username', { nullable: true }) username?: string,
    @Args('email', { nullable: true }) email?: string,
    @Args('password', { nullable: true }) password?: string,
    @Args('role', { type: () => UserRole, nullable: true }) role?: UserRole,
  ) {
    return this.authService.registerDummy(username, email, password, role);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: JwtUser) {
    return this.authService.me(user.id);
  }
}
