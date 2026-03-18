import { Module } from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { AdditionalsController } from './additionals.controller';

@Module({
  controllers: [AdditionalsController],
  providers: [AdditionalsService],
})
export class AdditionalsModule {}
