export default class User {
  constructor(username, password, email, balance = 1000) {
    this.username = username
    this.password = password
    this.email = email
    this.balance = balance
  }
}
