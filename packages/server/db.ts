import {
  Sequelize,
  SequelizeOptions,
  Model,
  Table,
  Column,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
} from 'sequelize-typescript'
import { InferAttributes, InferCreationAttributes } from 'sequelize/types/model'

let themeClass: any

export const createClientAndConnect = async () => {
  const sequelizeOptions: SequelizeOptions = {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'postgres',
    dialect: 'postgres',
  }

  const sequelize = new Sequelize(sequelizeOptions)

  @Table({
    tableName: 'themes',
    timestamps: false,
    paranoid: true,
  })
  class Theme extends Model<
    InferAttributes<Theme>,
    InferCreationAttributes<Theme>
  > {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    override id: number | undefined

    @AllowNull(false)
    @Column(DataType.STRING)
    theme: string | undefined

    @AllowNull(false)
    @Column(DataType.BOOLEAN)
    isTheme: boolean | undefined
  }
  sequelize.addModels([Theme])

  await Theme.sync()
    .then(() => {
      console.log('Синхронизация выполнена, можно начинать работать')
    })
    .catch(err => console.log('ERROR', err))

  themeClass = Theme
}

export { themeClass }
