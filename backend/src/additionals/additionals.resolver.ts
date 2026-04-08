import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdditionalsService } from './additionals.service';
import { AdditionalService } from './entities/additional.entity';
import { CreateAdditionalDto } from './dto/create-additional.dto';

@Resolver(() => AdditionalService)
export class AdditionalsResolver {
  constructor(private readonly additionalsService: AdditionalsService) {}

  @Mutation(() => AdditionalService)
  createAdditionalService(@Args('input') input: CreateAdditionalDto) {
    return this.additionalsService.create(input);
  }

  @Query(() => [AdditionalService])
  additionalServices() {
    return this.additionalsService.findAll();
  }
}
