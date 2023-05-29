import { Sequelize } from 'sequelize-typescript'

export function applyExtraSetup(sequelize: Sequelize) {
  const { theme, message } = sequelize.models;

  theme.hasMany(message);
  message.belongsTo(theme);
}