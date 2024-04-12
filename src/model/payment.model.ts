import { BeforeCount, BeforeFind, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'Payment',
  timestamps: true,
  indexes: [{ name: 'name_index', fields: ['name'] }],
})
export class PaymentModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  nameWarning: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  //   @

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.INTEGER })
  minimum: number;

  @Column({ type: DataType.INTEGER })
  maximum: number;

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
