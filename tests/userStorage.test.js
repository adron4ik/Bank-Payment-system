import fs from 'fs'
import UserStorage from '../backend/models/UserStorage.js'
import User from '../backend/models/User.js'

const storage = new UserStorage('test_users.json')

beforeEach(() => {
  fs.writeFileSync('./backend/test_users.json', JSON.stringify([]))
})

test('addUser adds user to file', () => {
  const user = new User('max', '123', 'm@gmail.com')

  storage.addUser(user)

  const all = storage.getAllUsers()
  expect(all.length).toBe(1)
  expect(all[0].username).toBe('max')
})
