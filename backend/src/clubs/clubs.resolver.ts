import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Club } from './entities/club.entity';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';

@Resolver(() => Club)
export class ClubsResolver {
  constructor(private readonly clubsService: ClubsService) {}

  @Mutation(() => Club)
  createClub(@Args('input') input: CreateClubDto) {
    return this.clubsService.create(input);
  }

  @Query(() => [Club])
  clubs() {
    return this.clubsService.findAll();
  }

  @Query(() => Club, { nullable: true })
  club(@Args('id', { type: () => ID }) id: string) {
    return this.clubsService.findOne(id);
  }
}
