import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { User } from 'src/users/entities/user.entity';
import { Club } from 'src/clubs/entities/club.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { AdditionalService } from 'src/additionals/entities/additional.entity';

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

  async create(dto: CreateBookingDto) {
    const booking = this.repo.create({
      date: dto.date,
      startTime: dto.startTime,
      hours: dto.hours,
    });

    if (dto.userId) {
      const user = await this.userRepo.findOneBy({ id: dto.userId });
      if (user) booking.user = user;
    }

    if (dto.clubId) {
      const club = await this.clubRepo.findOneBy({ id: dto.clubId });
      if (club) booking.club = club;
    }

    if (dto.seatIds?.length) {
      const seats = await this.seatRepo.findBy({ id: In(dto.seatIds) });
      booking.seats = seats;
    }

    if (dto.additionalIds?.length) {
      const services = await this.additionalRepo.findBy({ id: In(dto.additionalIds) });
      booking.services = services;
    }

    return this.repo.save(booking);
  }

  findAll() {
    return this.repo.find({ relations: ['user', 'club', 'seats', 'services'] });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'club', 'seats', 'services'],
    });
  }

  async update(id: number, dto: UpdateBookingDto) {
    if (dto.userId) {
      const user = await this.userRepo.findOneBy({ id: dto.userId });
      if (user) dto['user'] = user;
    }

    if (dto.clubId) {
      const club = await this.clubRepo.findOneBy({ id: dto.clubId });
      if (club) dto['club'] = club;
    }

    if (dto.seatIds?.length) {
      const seats = await this.seatRepo.findBy({ id: In(dto.seatIds) });
      dto['seats'] = seats;
    }

    if (dto.additionalIds?.length) {
      const services = await this.additionalRepo.findBy({ id: In(dto.additionalIds) });
      dto['services'] = services;
    }

    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
