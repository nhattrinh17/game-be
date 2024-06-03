import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { GamePointModel, UserModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'HistoryTransferPoints',
  indexes: [
    { name: 'userId_index', fields: ['userId'] },
    { name: 'createdAt_index', fields: ['createdAt'] },
  ],
})
export class HistoryTransferPointModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => UserModel) // Khóa ngoại đến bảng người chơi
  @Column
  userId: number;

  @BelongsTo(() => UserModel, 'userId')
  user: UserModel;

  @ForeignKey(() => GamePointModel) // Khóa ngoại đến bảng điểm game
  @Column
  gameTransferId: number;

  @BelongsTo(() => GamePointModel, 'gameTransferId')
  gameTransfer: GamePointModel;

  @ForeignKey(() => GamePointModel) // Khóa ngoại đến bảng điểm game
  @Column
  gameReceiverId: number;

  @BelongsTo(() => GamePointModel, 'gameReceiverId')
  gameReceiver: GamePointModel;

  @Column({ type: DataType.INTEGER })
  pointTrans: number;

  @Column({ type: DataType.INTEGER })
  surplus: number;

  @Column({ type: DataType.INTEGER })
  status: number;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.DATE })
  createdAt: Date;
}
