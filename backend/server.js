import express from 'express'
import cors from 'cors'
import User from './models/User.js'
import UserStorage from './models/UserStorage.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

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
  const newUser = new User(username, password, email)
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
app.listen(PORT, () => {
  console.log(`ssop: ${PORT}`)
})
