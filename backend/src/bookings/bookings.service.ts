import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { User } from 'src/users/entities/user.entity';
import { Club } from 'src/clubs/entities/club.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { AdditionalService } from 'src/additionals/entities/additional.entity';
import { BookingStatus } from './enums/booking-status.enum';
import { BookingAccessDto } from './dto/booking-access.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repo: Repository<Booking>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Club)
    private clubRepo: Repository<Club>,
    @InjectRepository(Seat)
    private seatRepo: Repository<Seat>,
    @InjectRepository(AdditionalService)
    private additionalRepo: Repository<AdditionalService>,
  ) {}

  async createBooking(userId: string, dto: CreateBookingDto) {
    this.assertFutureBookingSlot(dto.date, dto.startTime);

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const club = await this.clubRepo.findOne({
      where: { id: dto.clubId },
      relations: ['seats'],
    });
    if (!club) {
      throw new NotFoundException(`Club ${dto.clubId} not found`);
    }

    const seatIds = this.uniqueIds(dto.seatIds);
    if (seatIds.length === 0) {
      throw new BadRequestException('At least one seat must be selected');
    }

    const seats = await this.seatRepo.find({
      where: { id: In(seatIds) },
      relations: ['club', 'computer'],
    });
    if (seats.length !== seatIds.length) {
      throw new NotFoundException('One or more seats were not found');
    }

    const invalidSeat = seats.find((seat) => seat.club?.id !== club.id);
    if (invalidSeat) {
      throw new BadRequestException(
        `Seat ${invalidSeat.id} does not belong to club ${club.id}`,
      );
    }

    const conflictingSeatIds = await this.findConflictingSeatIds(
      seatIds,
      dto.date,
      dto.startTime,
    );
    if (conflictingSeatIds.length > 0) {
      throw new ConflictException(
        `Requested slot is already booked for seat ids: ${conflictingSeatIds.join(', ')}`,
      );
    }

    const additionalServiceIds = this.uniqueIds(dto.additionalServiceIds);
    const additionalServices = additionalServiceIds.length
      ? await this.additionalRepo.findBy({ id: In(additionalServiceIds) })
      : [];

    if (additionalServices.length !== additionalServiceIds.length) {
      throw new NotFoundException('One or more additional services were not found');
    }

    const totalPrice = this.calculateTotalPrice(seats, additionalServices);

    const booking = this.repo.create({
      user,
      club,
      seats,
      additionalServices,
      date: dto.date,
      startTime: dto.startTime,
      status: BookingStatus.ACTIVE,
      totalPrice,
    });

    const savedBooking = await this.repo.save(booking);
    return this.findBookingById(savedBooking.id, {
      actorUserId: userId,
      canManageAll: true,
    });
  }

  async cancelBooking(id: string, access: BookingAccessDto) {
    const booking = await this.findBookingById(id, access);

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException(`Booking ${id} is already cancelled`);
    }

    this.assertFutureBookingSlot(booking.date, booking.startTime);

    booking.status = BookingStatus.CANCELLED;
    await this.repo.save(booking);

    return this.findBookingById(id, {
      actorUserId: access.actorUserId,
      canManageAll: true,
    });
  }

  async findBookingById(id: string, access: BookingAccessDto) {
    const booking = await this.repo.findOne({
      where: { id },
      relations: ['user', 'club', 'seats', 'seats.club', 'seats.computer', 'additionalServices'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking ${id} not found`);
    }

    this.assertBookingAccess(booking, access);
    return booking;
  }

  async findUserBookings(userId: string) {
    await this.ensureUserExists(userId);

    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['user', 'club', 'seats', 'seats.club', 'seats.computer', 'additionalServices'],
      order: {
        date: 'ASC',
        startTime: 'ASC',
      },
    });
  }

  async findAvailableSeats(clubId: string, date: string, startTime: string) {
    this.assertFutureBookingSlot(date, startTime);

    const club = await this.clubRepo.findOne({
      where: { id: clubId },
      relations: ['seats', 'seats.computer'],
    });
    if (!club) {
      throw new NotFoundException(`Club ${clubId} not found`);
    }

    const conflictingSeatIds = await this.findConflictingSeatIds(
      club.seats.map((seat) => seat.id),
      date,
      startTime,
    );

    return club.seats.filter((seat) => !conflictingSeatIds.includes(seat.id));
  }

  private async ensureUserExists(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }
  }

  private assertBookingAccess(booking: Booking, access: BookingAccessDto) {
    if (access.canManageAll) {
      return;
    }

    if (booking.user.id !== access.actorUserId) {
      throw new ForbiddenException('You cannot access this booking');
    }
  }

  private calculateTotalPrice(
    seats: Seat[],
    additionalServices: AdditionalService[],
  ) {
    const seatPrice = seats.reduce((sum, seat) => sum + seat.price, 0);
    const servicesPrice = additionalServices.reduce(
      (sum, service) => sum + service.price,
      0,
    );

    return seatPrice + servicesPrice;
  }

  private assertFutureBookingSlot(date: string, startTime: string) {
    const bookingDate = new Date(`${date}T${startTime}:00`);
    if (Number.isNaN(bookingDate.getTime())) {
      throw new BadRequestException('Invalid booking date or time');
    }

    if (bookingDate <= new Date()) {
      throw new BadRequestException('Bookings are allowed only for future time slots');
    }
  }

  private uniqueIds(ids?: string[]) {
    return [...new Set(ids ?? [])];
  }

  private async findConflictingSeatIds(
    seatIds: string[],
    date: string,
    startTime: string,
  ) {
    if (seatIds.length === 0) {
      return [];
    }

    const rows = await this.repo
      .createQueryBuilder('booking')
      .innerJoin('booking.seats', 'seat')
      .select('seat.id', 'seatId')
      .where('booking.date = :date', { date })
      .andWhere('booking.startTime = :startTime', { startTime })
      .andWhere('booking.status = :status', { status: BookingStatus.ACTIVE })
      .andWhere('seat.id IN (:...seatIds)', { seatIds })
      .distinct(true)
      .getRawMany<{ seatId: string }>();

    return rows.map((row) => row.seatId);
  }
}
