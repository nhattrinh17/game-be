import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from 'src/constants';
import { BanksModel, NotificationModel, PaymentModel, UserModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'PaymentTransactions',
  timestamps: true,
  indexes: [
    { name: 'paymentId_index', fields: ['paymentId'] },
    { name: 'bank_index', fields: ['bankTransferId', 'bankReceiveId'] },
  ],
})
export class PaymentTransactionModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => PaymentModel)
  @Column
  paymentId: number;

  @BelongsTo(() => PaymentModel)
  payment: PaymentModel;

  @ForeignKey(() => UserModel)
  @Column
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => BanksModel)
  @Column
  bankTransferId: number;

  @BelongsTo(() => BanksModel, { foreignKey: 'bankTransferId', as: 'bankTransfer' })
  bankTransfer: BanksModel;

  @ForeignKey(() => BanksModel)
  @Column
  bankReceiveId: number;

  @BelongsTo(() => BanksModel, { foreignKey: 'bankReceiveId', as: 'bankReceive' })
  bankReceive: BanksModel;

  @Column({ type: DataType.STRING })
  qrCode: string;

  @Column({ type: DataType.TEXT })
  type: number;

  @Column({ type: DataType.INTEGER })
  point: number;

  @Column({ type: DataType.INTEGER, defaultValue: StatusPaymentTranSaction.processing })
  status: number;

  @Column({ type: DataType.STRING })
  receipt: string;

  @Column({ type: DataType.STRING })
  title: string;

  @ForeignKey(() => NotificationModel)
  @Column
  notificationId: number;

  @BelongsTo(() => NotificationModel)
  notification: NotificationModel;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  showAccount: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @BeforeFind
  @BeforeCount
  static async BeforeFindHook(options: any) {
    addConditionNotDelete(options);
  }
}
