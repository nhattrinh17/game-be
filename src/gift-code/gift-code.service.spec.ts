import { Test, TestingModule } from '@nestjs/testing';
import { GiftCodeService } from './gift-code.service';

describe('GiftCodeService', () => {
  let service: GiftCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftCodeService],
    }).compile();

    service = module.get<GiftCodeService>(GiftCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
