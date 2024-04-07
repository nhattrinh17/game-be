import { BeforeCount, BeforeFind, BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Status } from 'src/constants';
import { addConditionNotDelete, GroupModel, PermissionCategoryModel } from '.';

@Table({
  tableName: 'GroupPermission',
  timestamps: true,
  indexes: [
    { name: 'status_index', fields: ['status'] },
    { name: 'groupId_index', fields: ['groupId'] },
  ],
})
export class GroupPermissionModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => GroupModel)
  @Column
  groupId: number;

  @BelongsTo(() => GroupModel)
  group: GroupModel;

  @Column({ type: DataType.STRING, defaultValue: Status.Active })
  status: string;

  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  permissionCategoryIds: number[]; // Store array of Permission Service  IDs

  @HasMany(() => PermissionCategoryModel, 'id')
  permissionCategory: PermissionCategoryModel[];

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
