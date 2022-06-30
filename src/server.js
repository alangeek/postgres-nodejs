import 'dotenv/config'

import postgresDataBase from './config/database.js'

import app from './index.js'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Started server localhost:${port}`)
  postgresDataBase.connect(err => {
    if (err) {
      console.log('connect erro', err.stack)
    } else {
      console.log('db connection successful')
    }
  })
})
