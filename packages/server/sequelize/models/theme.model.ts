import { DataTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default (sequelize: Sequelize) => {
  sequelize.define('theme', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    theme: {
      allowNull: false,
      type: DataTypes.STRING
    }
  })
}
