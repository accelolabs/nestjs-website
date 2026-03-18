import { Injectable } from '@nestjs/common';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';

@Injectable()
export class ComputersService {
  create(createComputerDto: CreateComputerDto) {
    return 'This action adds a new computer';
  }

  findAll() {
    return `This action returns all computers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} computer`;
  }

  update(id: number, updateComputerDto: UpdateComputerDto) {
    return `This action updates a #${id} computer`;
  }

  remove(id: number) {
    return `This action removes a #${id} computer`;
  }
}
