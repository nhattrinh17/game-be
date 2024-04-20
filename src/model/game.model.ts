import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { GamePointModel, GameTypeModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'Games',
  timestamps: true,
  indexes: [
    { name: 'status_index', fields: ['status'] },
    { name: 'slug_index', fields: ['slug'] },
  ],
})
export class GameModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  //   @ForeignKey(() => GroupModel)
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @ForeignKey(() => GameTypeModel)
  @Column
  gameTypeId: number;

  @BelongsTo(() => GameTypeModel)
  gameType: GameTypeModel;

  @ForeignKey(() => GamePointModel)
  @Column
  gamePointId: number;

  @BelongsTo(() => GamePointModel)
  gamePoint: GamePointModel;

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
