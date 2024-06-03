import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { StatusGiftCode } from 'src/constants';
import { UserModel } from './user.model';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'GiftCodes',
  timestamps: true,
  indexes: [
    { name: 'code_index', fields: ['code'] },
    { name: 'status_index', fields: ['status'] },
  ],
})
export class GiftCodeModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  code: string;

  @ForeignKey(() => UserModel)
  @Column
  userIdCreate: number;

  @BelongsTo(() => UserModel)
  userCreate: UserModel;

  @Column({ type: DataType.INTEGER })
  point: number;

  @Column({ type: DataType.INTEGER, defaultValue: StatusGiftCode.Created })
  status: number;

  @Column({ type: DataType.STRING })
  name: string;

  @ForeignKey(() => UserModel)
  @Column
  userIdUse: number;

  @BelongsTo(() => UserModel)
  userUse: UserModel;

  @Column({ type: DataType.DATE })
  timeUse: Date;

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
