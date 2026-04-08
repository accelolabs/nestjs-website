import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './entities/booking.entity';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Seat } from 'src/seats/entities/seat.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import type { JwtUser } from 'src/auth/interfaces/jwt-user.interface';
import { UserRole } from 'src/users/enums/user-role.enum';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  createBooking(@CurrentUser() user: JwtUser, @Args('input') input: CreateBookingDto) {
    return this.bookingsService.createBooking(user.id, input);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Booking)
  cancelBooking(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: JwtUser,
  ) {
    return this.bookingsService.cancelBooking(id, {
      actorUserId: user.id,
      canManageAll: user.role === UserRole.ADMIN,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Booking, { nullable: true })
  booking(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: JwtUser) {
    return this.bookingsService.findBookingById(id, {
      actorUserId: user.id,
      canManageAll: user.role === UserRole.ADMIN,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Booking])
  userBookings(@CurrentUser() user: JwtUser) {
    return this.bookingsService.findUserBookings(user.id);
  }

  @Query(() => [Seat])
  availableSeats(
    @Args('clubId', { type: () => ID }) clubId: string,
    @Args('date') date: string,
    @Args('startTime') startTime: string,
  ) {
    return this.bookingsService.findAvailableSeats(clubId, date, startTime);
  }
}
