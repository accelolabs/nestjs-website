import { Module } from '@nestjs/common';
import { ComputersService } from './computers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Computer } from './entities/computer.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { ComputersResolver } from './computers.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Computer, Seat])],
  providers: [ComputersService, ComputersResolver],
})
export class ComputersModule {}
