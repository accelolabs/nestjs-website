import { Module } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { ComputersController } from './computers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from './entities/computer.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Computer, Seat])],
  controllers: [ComputersController],
  providers: [ComputersService],
})
export class ComputersModule {}
