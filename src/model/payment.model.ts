import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { BanksModel, PaymentTypeModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Payment',
  timestamps: true,
  indexes: [
    { name: 'name_index', fields: ['name'] },
    { name: 'slug_index', fields: ['slug'] },
  ],
})
export class PaymentModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => PaymentTypeModel)
  @Column
  paymentTypeId: number;

  @BelongsTo(() => PaymentTypeModel)
  paymentType: PaymentTypeModel;

  @Column({ type: DataType.STRING })
  methodName: string;

  @Column({ type: DataType.STRING })
  methodImage: string;

  @Column({ type: DataType.STRING })
  nameWarning: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.INTEGER })
  minimum: number;

  @Column({ type: DataType.INTEGER })
  maximum: number;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  bankIds: number[]; // Store array banks

  @HasMany(() => BanksModel, 'id')
  banks: BanksModel[];

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
