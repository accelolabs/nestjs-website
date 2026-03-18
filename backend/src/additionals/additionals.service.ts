import { Injectable } from '@nestjs/common';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';
import { Repository } from 'typeorm';
import { AdditionalService } from './entities/additional.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdditionalsService {
  constructor(
    @InjectRepository(AdditionalService)
    private repo: Repository<AdditionalService>,
  ) {}

  create(dto: CreateAdditionalDto) {
    const additional = this.repo.create(dto);
    return this.repo.save(additional);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['bookings'],
    });
  }

  update(id: number, dto: UpdateAdditionalDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
