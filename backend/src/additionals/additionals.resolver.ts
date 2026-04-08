import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdditionalsService } from './additionals.service';
import { AdditionalService } from './entities/additional.entity';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver(() => AdditionalService)
export class AdditionalsResolver {
  constructor(private readonly additionalsService: AdditionalsService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => AdditionalService)
  createAdditionalService(@Args('input') input: CreateAdditionalDto) {
    return this.additionalsService.create(input);
  }

  @Query(() => [AdditionalService])
  additionalServices() {
    return this.additionalsService.findAll();
  }
}
