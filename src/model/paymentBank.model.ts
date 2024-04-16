import { Model, Table, ForeignKey, Column, PrimaryKey, DataType, BelongsTo } from 'sequelize-typescript';
import { PaymentModel } from './payment.model';
import { BanksModel } from './banking.model';

@Table({
  tableName: 'PaymentBanks',
  timestamps: true,
})
export class PaymentBankModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @PrimaryKey
  @ForeignKey(() => PaymentModel) // Khai báo khóa ngoại cho cột paymentId
  @Column(DataType.INTEGER)
  paymentId: number;

  @PrimaryKey
  @ForeignKey(() => BanksModel) // Khai báo khóa ngoại cho cột bankId
  @Column(DataType.INTEGER)
  bankId: number;

  // Khai báo quan hệ BelongsTo với model Payment
  @BelongsTo(() => PaymentModel)
  payment: PaymentModel;

  // Khai báo quan hệ BelongsTo với model Bank
  @BelongsTo(() => BanksModel)
  bank: BanksModel;
}
