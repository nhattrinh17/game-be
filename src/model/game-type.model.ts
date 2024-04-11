import { BeforeCount, BeforeFind, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'GameTypes',
  timestamps: true,
  indexes: [{ name: 'status_index', fields: ['status'] }],
})
export class GameTypeModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  //   @ForeignKey(() => GroupModel)
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

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
