import { Op } from 'sequelize';

export * from './user.model';
export * from './permission-action.model';
export * from './permission-service.model';
export * from './permission-category.model';
export * from './group.model';
export * from './game-type.model';
export * from './payment-type.model';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
