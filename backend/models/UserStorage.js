import fs from 'fs'
import path from 'path'
import User from './User.js'

export default class UserStorage {
  constructor(filename = 'users.json') {
    this.filePath = path.resolve(`./backend/${filename}`)
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]))
    }
  }
  getAllUsers() {
    const data = fs.readFileSync(this.filePath, 'utf-8')
    return JSON.parse(data)
  }
  findUser(username) {
    const users = this.getAllUsers()
    return users.find(u => u.username === username)
  }
  addUser(user) {
    const users = this.getAllUsers()
    users.push(user)
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2))
  }
}
