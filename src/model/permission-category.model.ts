import { BeforeCount, BeforeFind, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status, TypePermissionCategory } from 'src/constants';
import { PermissionActionModel, PermissionServiceModel, addConditionNotDelete } from '.';

@Table({
  tableName: 'PermissionCategory',
  timestamps: true,
  indexes: [
    { name: 'status_index', fields: ['status'] },
    { name: 'name_index', fields: ['name'] },
  ],
})
export class PermissionCategoryModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  icon: string;

  @Column({ type: DataType.STRING })
  slug: string;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.STRING, defaultValue: TypePermissionCategory.Single })
  type: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  permissionServiceIds: number[]; // Store array of Permission Service  IDs

  @HasMany(() => PermissionServiceModel, 'id')
  permissionServices: PermissionServiceModel[];

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
