import { Op } from 'sequelize';

export * from './user.model';
export * from './permission-action.model';
export * from './permission-service.model';
export * from './permission-category.model';
export * from './group.model';
export * from './game-type.model';
export * from './payment-type.model';
export * from './banking.model';
export * from './payment.model';
export * from './paymentBank.model';
export * from './payment-transaction.model';
export * from './notification.model';
export * from './game-point.model';
export * from './game.model';
export * from './user-point.model';
export * from './history-transfer-point.model';
export * from './gift-code.mode';

export const addConditionNotDelete = (options: any) => {
  if (!options.where) {
    options.where = {};
  }
  options.where.isDeleted = { [Op.ne]: true };
};
