import { Sequelize } from 'sequelize-typescript'
import { applyExtraSetup } from './utils/utils'
import themeModel from './models/theme.model'
import messageModel from './models/message.model'
import schemeModel from './models/scheme.model'

const { DATABASE_URL } = process.env
const sequelize = new Sequelize(DATABASE_URL as string)

const modelDefiners = [
  themeModel,
  messageModel,
  schemeModel
]

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize)
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize)

// We export the sequelize connection instance to be used around our app.
export default sequelize
