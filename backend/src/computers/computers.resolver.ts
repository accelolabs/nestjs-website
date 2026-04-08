import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Computer } from './entities/computer.entity';
import { ComputersService } from './computers.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver(() => Computer)
export class ComputersResolver {
  constructor(private readonly computersService: ComputersService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Computer)
  createComputer(@Args('input') input: CreateComputerDto) {
    return this.computersService.create(input);
  }

  @Query(() => [Computer])
  computers() {
    return this.computersService.findAll();
  }

  @Query(() => Computer, { nullable: true })
  computer(@Args('id', { type: () => ID }) id: string) {
    return this.computersService.findOne(id);
  }
}
