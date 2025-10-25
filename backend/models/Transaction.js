export default class Transaction {
  constructor(from, to, amount, date = new Date()) {
    this.from = from
    this.to = to
    this.amount = amount
    this.date = date
  }
}