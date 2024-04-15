import { BeforeCount, BeforeFind, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'Banks',
  timestamps: true,
  indexes: [{ name: 'name_index', fields: ['name'] }],
})
export class BanksModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  nameBank: string;

  @Column({ type: DataType.INTEGER })
  binBank: number;

  @Column({ type: DataType.STRING })
  branch: string;

  @Column({ type: DataType.STRING })
  accountOwner: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  accountNumber: string;

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
