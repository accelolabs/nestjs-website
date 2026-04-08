import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Club } from './entities/club.entity';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver(() => Club)
export class ClubsResolver {
  constructor(private readonly clubsService: ClubsService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
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
