import client from '../config/database.js'

client.connect()
client
  .query('SELECT * FROM persons')
  .then(results => {
    const resultado = results.rows
    console.table(resultado)
  })
  .finally(() => client.end())

// getUsers()
// const getUsers = async () => {
//   try {
//     console.log('iniciando a conexão')
//     await client.connect()
//     console.log('conexão bem sucedida!')
//     const resultado = await client.query('SELECT * FROM persons')
//     console.table(resultado.rows)
//   } catch (err) {
//     console.log(err)
//   } finally {
//     await client.end()
//     console.log('cliente desconectado.')
//   }
// }

// const postUsers = async () => {
//   try {
//     console.log('iniciando a conexão')
//     await client.connect()
//     console.log('conexão bem sucedida!')
//     await client.query(
//       'INSERT INTO * persons("lastname", "firstname") values (' +
//         "'" +
//         lastname +
//         "','" +
//         firstname +
//         "');"
//     )
//   } catch (err) {
//     console.log(err)
//   } finally {
//     await client.end()
//     console.log('cliente desconectado.')
//   }
// }
