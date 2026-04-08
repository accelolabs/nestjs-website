import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';

@Resolver(() => Seat)
export class SeatsResolver {
  constructor(private readonly seatsService: SeatsService) {}

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
