import { Module } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './entities/club.entity';
import { ClubsResolver } from './clubs.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubsService, ClubsResolver],
})
export class ClubsModule {}
