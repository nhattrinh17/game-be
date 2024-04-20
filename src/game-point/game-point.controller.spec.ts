import { Test, TestingModule } from '@nestjs/testing';
import { GamePointController } from './game-point.controller';
import { GamePointService } from './game-point.service';

describe('GamePointController', () => {
  let controller: GamePointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamePointController],
      providers: [GamePointService],
    }).compile();

    controller = module.get<GamePointController>(GamePointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
