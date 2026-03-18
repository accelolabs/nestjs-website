import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Club } from 'src/clubs/entities/club.entity';
import { Computer } from 'src/computers/entities/computer.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private repo: Repository<Seat>,
    @InjectRepository(Club)
    private clubRepo: Repository<Club>,
    @InjectRepository(Computer)
    private computerRepo: Repository<Computer>,
  ) {}

  async create(dto: CreateSeatDto) {
    const seat = this.repo.create({
      number: dto.number,
      price: dto.price,
      occupied: dto.occupied ?? false,
    });

    if (dto.clubId) {
      const club = await this.clubRepo.findOneBy({ id: dto.clubId });
      if (club) seat.club = club;
    }

    if (dto.computerId) {
      const computer = await this.computerRepo.findOneBy({ id: dto.computerId });
      if (computer) seat.computer = computer;
    }

    return this.repo.save(seat);
  }

  findAll() {
    return this.repo.find({ relations: ['club', 'computer'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['club', 'computer'] });
  }

  async update(id: number, dto: UpdateSeatDto) {
    if (dto.clubId) {
      const club = await this.clubRepo.findOneBy({ id: dto.clubId });
      if (club) dto['club'] = club;
    }

    if (dto.computerId) {
      const computer = await this.computerRepo.findOneBy({ id: dto.computerId });
      if (computer) dto['computer'] = computer;
    }

    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
