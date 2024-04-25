import { BeforeCount, BeforeFind, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'Notifications',
  timestamps: true,
  indexes: [
    { name: 'type_index', fields: ['type'] },
    { name: 'timePublish_index', fields: ['timePublish'] },
  ],
})
export class NotificationModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  type: string;

  @Column({ type: DataType.STRING })
  kind: string;

  @Column({ type: DataType.TEXT })
  content: string;

  @Column({ type: DataType.DATE })
  timePublish: Date;

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
