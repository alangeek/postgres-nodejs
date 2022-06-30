import 'dotenv/config'
import pg from 'pg'

const postgresDataBase = new pg.Pool({
  connectionString: process.env.DB_URL
})

export default postgresDataBase
