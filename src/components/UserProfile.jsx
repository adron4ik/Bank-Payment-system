import { useEffect, useState } from 'react'
import './UserProfile.css'
const UserProfile = () => {

  const [userData, setUserData] = useState(null)

  const [transactions, setTransactions] = useState([])

  const username = localStorage.getItem('username')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${username}`)

        const data = await res.json()
        if (res.ok) setUserData(data)
        else alert(data.message)
      } catch (err) {

        console.error(err)
        alert('Помилка завантаження даних користувача')
      }
    }

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:3001/transactions/${username}`)

        const data = await res.json()
        if (res.ok) setTransactions(data)
        else alert(data.message)
      } catch (err) {

        console.error(err)
        alert('Помилка завантаження транзакцій')
      }
    }


    if (username) {
      fetchUser()
      fetchTransactions()
    }
  }, [username])
  return (
    <div className="profile-container">
      <h1 className="profile-title">Профіль користувача</h1>

      {userData ? (
        <div className="profile-card">
          <p><span>Користувач:</span> {userData.username}</p>
          <p><span>Email:</span> {userData.email}</p>
          <p><span>Баланс:</span> {userData.balance} ₴</p>
        </div>
      ) : (
        <p>Завантаження даних...</p>
      )}
      <h2 className="transactions-title">Історія транзакцій</h2>
      {transactions.length > 0 ? (
        <div className="transactions-list">
          {transactions.map((t, i) => (
            <div key={i} className="transaction-card">
              <p><b>Від:</b> {t.from}</p>
              <p><b>До:</b> {t.to}</p>
              <p><b>Сума:</b> {t.amount} ₴</p>
              <p className="date">{new Date(t.date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Транзакцій ще немає</p>
      )}
      <button className="delete-btn">Видалити акаунт</button>
    </div>
  )
}
export default UserProfile
