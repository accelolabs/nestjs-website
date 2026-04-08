import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
