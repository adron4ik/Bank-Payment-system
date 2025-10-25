import express from 'express'
import cors from 'cors'
import User from './models/User.js'
import UserStorage from './models/UserStorage.js'
import TransactionStorage from './models/TransactionStorage.js'

const app = express()
const PORT = 3001


app.use(cors())
app.use(express.json())

const transactionStorage = new TransactionStorage()
const storage = new UserStorage()
// reg
app.post('/register', (req, res) => {
  const { username, password, email } = req.body
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Заповніть усі поля' })
  }
  if (storage.findUser(username)) {
    return res.status(400).json({ message: 'Користувач вже існує' })
  }
  const newUser = new User(username, password, email, 1000)
  storage.addUser(newUser)
  res.status(200).json({ message: 'Реєстрація успішна' })
})


// log
app.post('/login', (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Заповніть усі поля' })
  }
  const user = storage.findUser(username)
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Невірний логін або пароль' })
  }
  res.status(200).json({ message: 'Вхід успішний', user: { username: user.username, email: user.email } })
})
//trans
app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body
  const result = transactionStorage.makeTransaction(from, to, amount)
  if (!result.success) {
    return res.status(400).json({ message: result.message })
  }
  res.status(200).json({ message: result.message })
})

// get data about user
app.get('/user/:username', (req, res) => {
  const { username } = req.params
  const user = storage.findUser(username)
  if (!user) return res.status(404).json({ message: 'Користувач не знайдений' })
  res.status(200).json({ username: user.username, email: user.email, balance: user.balance })
})


app.listen(PORT, () => {
  console.log(`ssop: ${PORT}`)
})
