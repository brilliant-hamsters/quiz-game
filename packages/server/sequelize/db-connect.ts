import sequelize from './'

export default async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`)
  try {
    await sequelize.authenticate()
    console.log('Database connection OK!')
  } catch (error) {
    console.log('Unable to connect to the database:')
    if (error instanceof Error) {
      console.log(error.message)
    }
    process.exit(1)
  }
}