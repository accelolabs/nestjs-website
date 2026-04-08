import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service';
import { Club } from 'src/clubs/entities/club.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Computer } from 'src/computers/entities/computer.entity';
import { AdditionalService } from 'src/additionals/entities/additional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Seat, Computer, AdditionalService])],
  providers: [SeedService],
})
export class SeedModule {}
