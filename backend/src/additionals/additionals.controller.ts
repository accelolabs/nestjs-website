import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdditionalsService } from './additionals.service';
import { CreateAdditionalDto } from './dto/create-additional.dto';
import { UpdateAdditionalDto } from './dto/update-additional.dto';

@Controller('additionals')
export class AdditionalsController {
  constructor(private readonly additionalsService: AdditionalsService) {}

  @Post()
  create(@Body() createAdditionalDto: CreateAdditionalDto) {
    return this.additionalsService.create(createAdditionalDto);
  }

  @Get()
  findAll() {
    return this.additionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.additionalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdditionalDto: UpdateAdditionalDto) {
    return this.additionalsService.update(+id, updateAdditionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.additionalsService.remove(+id);
  }
}
