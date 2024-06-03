import { Test, TestingModule } from '@nestjs/testing';
import { GiftCodeController } from './gift-code.controller';
import { GiftCodeService } from './gift-code.service';

describe('GiftCodeController', () => {
  let controller: GiftCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftCodeController],
      providers: [GiftCodeService],
    }).compile();

    controller = module.get<GiftCodeController>(GiftCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
