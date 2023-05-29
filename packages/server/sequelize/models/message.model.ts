import { DataTypes } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

export default (sequelize: Sequelize) => {
  sequelize.define('message', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING
    },
    responseToMessageId: {
      defaultValue: null,
      type: DataTypes.INTEGER
    },
    likes: {
      defaultValue: 0,
      type: DataTypes.INTEGER
    }
  })
}
