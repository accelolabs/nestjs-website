import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Club } from 'src/clubs/entities/club.entity';
import { Computer } from 'src/computers/entities/computer.entity';
import { SeatsResolver } from './seats.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Club, Computer])],
  providers: [SeatsService, SeatsResolver],
})
export class SeatsModule {}
