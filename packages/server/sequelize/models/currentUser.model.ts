import { DataTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default (sequelize: Sequelize) => {
  sequelize.define('currentUser', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    },
  })
}
