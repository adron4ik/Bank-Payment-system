import fs from 'fs'
import path from 'path'
import Transaction from './transaction.js'
import UserStorage from './UserStorage.js'

export default class TransactionStorage {
  constructor(filename = 'transactions.json') {
    this.filePath = path.resolve(`./backend/${filename}`)
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]))
    }
    this.userStorage = new UserStorage()
  }

  getAllTransactions() {
    const data = fs.readFileSync(this.filePath, 'utf-8')
    return JSON.parse(data)
  }

  addTransaction(transaction) {
    const transactions = this.getAllTransactions()
    transactions.push(transaction)
    fs.writeFileSync(this.filePath, JSON.stringify(transactions, null, 2))
  }

  makeTransaction(fromUsername, toUsername, amount) {
    const users = this.userStorage.getAllUsers()
    const sender = users.find(u => u.username === fromUsername)
    const receiver = users.find(u => u.username === toUsername)

    if (!sender) return { success: false, message: 'Відправник не знайдений' }
    if (!receiver) return { success: false, message: 'Одержувач не знайдений' }

    amount = Number(amount)
    if (isNaN(amount) || amount <= 0) return { success: false, message: 'Некоректна сума' }

    if (sender.balance < amount) {
      return { success: false, message: 'Недостатньо коштів' }
    }

    sender.balance -= amount
    receiver.balance += amount

    fs.writeFileSync(this.userStorage.filePath, JSON.stringify(users, null, 2))

     const newTransaction = new Transaction(fromUsername, toUsername, amount)
    this.addTransaction(newTransaction)

    return { success: true, message: 'Переказ успішний' }
  }
}