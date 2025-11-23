import { useEffect, useState } from 'react'

export default function Payment() {
  const [userData, setUserData] = useState(null)
  const [form, setForm] = useState({ to: '', amount: '' })
  const username = localStorage.getItem('username')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:3001/user/${username}`)
        const data = await res.json()
        if (res.ok) {
          setUserData(data)
        } else {
          alert(data.message)
        }
      } catch (err) {
        console.error(err)
        alert('Помилка завантаження даних користувача')
      }
    }

    if (username) fetchUser()
  }, [username])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleTransfer = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: username,
          to: form.to,
          amount: parseFloat(form.amount)
        })
      })

      const data = await res.json()
      alert(data.message)
      if (res.ok) {
        const updated = await fetch(`http://localhost:3001/user/${username}`)
        const updatedData = await updated.json()
        setUserData(updatedData)
        setForm({ to: '', amount: '' })
      }
    } catch (err) {
      console.error(err)
      alert('Помилка переказу')
    }
  }

  return (
    <div className="payment-container">
      <h2 className="payment-title">💸 Переказ коштів</h2>

      {userData ? (
        <div className="payment-user">
          <p>Користувач: <span>{userData.username}</span></p>
          <p>Баланс: <span>{userData.balance} ₴</span></p>
        </div>
      ) : (
        <p>Завантаження...</p>
      )}

      <form onSubmit={handleTransfer} className="payment-form">
        <input
          type="text"
          name="to"
          placeholder="Кому переказати"
          value={form.to}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Сума"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <button type="submit">Переказати</button>
      </form>
    </div>
  )
}
