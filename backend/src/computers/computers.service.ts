import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Computer } from './entities/computer.entity';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { Seat } from 'src/seats/entities/seat.entity';

@Injectable()
export class ComputersService {
  constructor(
    @InjectRepository(Computer)
    private repo: Repository<Computer>,
    @InjectRepository(Seat)
    private seatRepo: Repository<Seat>,
  ) {}

  async create(dto: CreateComputerDto) {
    const computer = this.repo.create({
      cpu: dto.cpu,
      ram: dto.ram,
      gpu: dto.gpu,
      os: dto.os,
    });

    if (dto.seatId) {
      const seat = await this.seatRepo.findOneBy({ id: dto.seatId });
      if (seat) computer.seat = seat;
    }

    return this.repo.save(computer);
  }

  findAll() {
    return this.repo.find({ relations: ['seat'] });
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id }, relations: ['seat'] });
  }

  async update(id: string, dto: UpdateComputerDto) {
    if (dto.seatId) {
      const seat = await this.seatRepo.findOneBy({ id: dto.seatId });
      if (seat) dto['seat'] = seat;
    }
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
