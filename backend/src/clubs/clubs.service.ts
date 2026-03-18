import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private repo: Repository<Club>,
  ) {}

  create(dto: CreateClubDto) {
    const club = this.repo.create({
      name: dto.name,
      address: dto.address,
    });
    return this.repo.save(club);
  }

  findAll() {
    return this.repo.find({ relations: ['seats', 'bookings'] });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['seats', 'bookings'] });
  }

  update(id: number, dto: UpdateClubDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
