import { Module } from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional.entity';
import { AdditionalsResolver } from './additionals.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AdditionalService])],
  providers: [AdditionalsService, AdditionalsResolver],
})
export class AdditionalsModule {}
