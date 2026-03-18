import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Club } from 'src/clubs/entities/club.entity';
import { Computer } from 'src/computers/entities/computer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seat, Club, Computer])],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
