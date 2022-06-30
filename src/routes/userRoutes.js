import express from 'express'

import postgresClient from '../config/database.js'

const router = express.Router()

// Create user
router.post('/', async (req, res) => {
  try {
    const text =
      "INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *"

    const values = [req.body.email, req.body.password, req.body.fullname]

    const { rows } = await postgresClient.query(text, values)
    return res.status(201).json({ createdUser: rows[0] })
  } catch (err) {
    console.log('Error occured', err.message)
    return res.status(400).json({ message: err.message })
  }
})

// Authenticate user
router.post('/login', async (req, res) => {
  try {
    const text =
      'SELECT * FROM users WHERE email = $1 AND password = crypt($2, password)'

    const values = [req.body.email, req.body.password]

    const { rows } = await postgresClient.query(text, values)
    if (!rows.length)
      return res.status(404).json({ message: 'User not found.' })

    return res.status(200).json({ message: 'Authenticate successfull.' })
  } catch (err) {
    console.log('Error occured', err.message)
    return res.status(400).json({ message: err.message })
  }
})

// Update user
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const text =
      'UPDATE users SET email = $1, fullname = $2 WHERE id = $3 RETURNING *'

    const values = [req.body.email, req.body.fullname, userId]

    const { rows } = await postgresClient.query(text, values)
    if (!rows.length)
      return res.status(404).json({ message: 'User not found.' })

    return res.status(200).json({ updatedUser: rows[0] })
  } catch (err) {
    console.log('Error occured', err.message)
    return res.status(400).json({ message: err.message })
  }
})

router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const text = 'DELETE FROM users WHERE id = $1 RETURNING *'

    const values = [userId]

    const { rows } = await postgresClient.query(text, values)
    if (!rows.length)
      return res.status(404).json({ message: 'User not found.' })
    return res.status(200).json({ deleteUser: rows[0] })
  } catch (err) {
    console.log('Error occured', err.message)
    return res.status(400).json({ message: err.message })
  }
})

// Get users
router.get('/', async (req, res) => {
  try {
    const text = 'SELECT * FROM users ORDER BY id ASC'

    const { rows } = await postgresClient.query(text)

    return res.status(200).json(rows)
  } catch (error) {
    console.log('Error occured', err.message)
    return res.status(400).json({ message: err.message })
  }
})

export default router
