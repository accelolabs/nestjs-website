import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Computer } from './entities/computer.entity';
import { ComputersService } from './computers.service';
import { CreateComputerDto } from './dto/create-computer.dto';

@Resolver(() => Computer)
export class ComputersResolver {
  constructor(private readonly computersService: ComputersService) {}

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
