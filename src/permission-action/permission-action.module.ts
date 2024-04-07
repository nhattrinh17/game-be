import { Module } from '@nestjs/common';
import { PermissionActionService } from './permission-action.service';
import { PermissionActionController } from './permission-action.controller';

@Module({
  controllers: [PermissionActionController],
  providers: [PermissionActionService],
})
export class PermissionActionModule {}
