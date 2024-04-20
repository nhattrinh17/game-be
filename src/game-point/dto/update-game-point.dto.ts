import { PartialType } from '@nestjs/swagger';
import { CreateGamePointDto } from './create-game-point.dto';

export class UpdateGamePointDto extends PartialType(CreateGamePointDto) {}
