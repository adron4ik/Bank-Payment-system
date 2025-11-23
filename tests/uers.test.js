import User from '../backend/models/User.js'

test('User initializes correctly', () => {
  const user = new User('max', '123', 'max@gmail.com')

  expect(user.username).toBe('max')
  expect(user.password).toBe('123')
  expect(user.balance).toBe(1000)
})
