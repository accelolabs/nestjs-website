import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalsService } from './additionals.service';

describe('AdditionalsService', () => {
  let service: AdditionalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdditionalsService],
    }).compile();

    service = module.get<AdditionalsService>(AdditionalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
