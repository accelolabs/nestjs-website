import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalsController } from './additionals.controller';
import { AdditionalsService } from './additionals.service';

describe('AdditionalsController', () => {
  let controller: AdditionalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdditionalsController],
      providers: [AdditionalsService],
    }).compile();

    controller = module.get<AdditionalsController>(AdditionalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
