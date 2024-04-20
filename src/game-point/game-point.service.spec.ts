import { Test, TestingModule } from '@nestjs/testing';
import { GamePointService } from './game-point.service';

describe('GamePointService', () => {
  let service: GamePointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamePointService],
    }).compile();

    service = module.get<GamePointService>(GamePointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
