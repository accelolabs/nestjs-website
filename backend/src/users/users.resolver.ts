import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtUser } from 'src/auth/interfaces/jwt-user.interface';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('input') input: CreateUserDto) {
    return this.usersService.create(input);
  }

  @Query(() => User, { nullable: true })
  user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  freeMoney(
    @CurrentUser() user: JwtUser,
    @Args('amount', { type: () => Int, nullable: true }) amount?: number,
  ) {
    return this.usersService.topUpBalance(user.id, amount ?? 100);
  }
}
