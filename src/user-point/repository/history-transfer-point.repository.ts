import { HistoryTransferPointModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base';
import { HistoryTransferPointInterface } from '../interface/history-transfer-point.interface';
import { InjectModel } from '@nestjs/sequelize';

export class HistoryTransferPointRepository extends BaseRepositoryAbstract<HistoryTransferPointModel> implements HistoryTransferPointInterface {
  constructor(
    @InjectModel(HistoryTransferPointModel)
    private readonly historyTransferPointModel: typeof HistoryTransferPointModel,
  ) {
    super(historyTransferPointModel);
  }
}
