import sequelize from './index'
import { pickRandom } from '../utils/utils'

export default async function setupDatabase() {
  console.log(
    'Will rewrite the SQLite example database, adding some dummy data.'
  )

  await sequelize.models.message.sync({ force: true })
  await sequelize.models.theme.sync({ force: true })
  await sequelize.models.currentUser.sync({ force: true })

  await sequelize.models.theme.bulkCreate([
    { theme: 'How to become Junior' },
    { theme: 'How to become Middle' },
    { theme: 'How to become Senior' },
  ])

  for (const theme of await sequelize.models.theme.findAll()) {
    for (let i = 0; i < 5; i++) {
      const author = pickRandom([
        'Admin',
        'Wrestler',
        'Dima',
        'Mariya',
        'Alex',
        'Efim',
      ])

      const message = pickRandom([
        'Hello!',
        'Just google it',
        'Bye!',
        'Nice to meet you!',
        'Go to Stackoverflow',
        '42',
        "Don't care",
      ])

      await sequelize.models.message.create({
        message,
        author,
        // @ts-ignore
        themeId: theme.id,
      })
    }
  }

  console.log('Done!')
}
