import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver(() => Seat)
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Mutation(() => Seat)
  createSeat(@Args('input') input: CreateSeatDto) {
    return this.seatsService.create(input);
  }

  @Query(() => [Seat])
  seats() {
    return this.seatsService.findAll();
  }

  @Query(() => Seat, { nullable: true })
  seat(@Args('id', { type: () => ID }) id: string) {
    return this.seatsService.findOne(id);
  }
}
