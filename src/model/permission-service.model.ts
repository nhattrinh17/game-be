import { BeforeCount, BeforeFind, BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { PermissionActionModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'PermissionService',
  timestamps: true,
  indexes: [{ name: 'status_index', fields: ['status'] }],
})
export class PermissionServiceModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  actionIds: number[]; // Store array of Action IDs

  @HasMany(() => PermissionActionModel, 'id')
  actions: PermissionActionModel[];

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
