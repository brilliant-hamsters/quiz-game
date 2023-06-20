import { DataTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default (sequelize: Sequelize) => {
  sequelize.define('scheme', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    theme: {
      allowNull: false,
      defaultValue: 'light',
      type: DataTypes.STRING
    }
  })
}
