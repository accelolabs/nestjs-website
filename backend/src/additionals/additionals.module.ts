import { Module } from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { AdditionalsController } from './additionals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalService])],
  controllers: [AdditionalsController],
  providers: [AdditionalsService],
})
export class AdditionalsModule {}
