import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { StatusPaymentTranSaction, TypePaymentTranSaction } from 'src/constants';
import { BanksModel, NotificationModel, PaymentModel, UserModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'PaymentTransactions',
  timestamps: true,
  indexes: [{ name: 'name_index', fields: ['methodName'] }],
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
  bankId: number;

  @BelongsTo(() => BanksModel)
  bank: BanksModel;

  @Column({ type: DataType.STRING })
  qrCode: string;

  @Column({ type: DataType.STRING })
  type: string;

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
