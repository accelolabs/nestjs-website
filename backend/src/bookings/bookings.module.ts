import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { User } from 'src/users/entities/user.entity';
import { AdditionalService } from 'src/additionals/entities/additional.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Club } from 'src/clubs/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, User, Club, Seat, AdditionalService])],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
