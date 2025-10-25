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
      }
    } catch (err) {
      console.error(err)
      alert('Помилка переказу')
    }
  }

  return (
    <div>
      <h2>Переказ коштів</h2>
      {userData ? (
        <>
          <p>Користувач: <b>{userData.username}</b></p>
          <p>Баланс: <b>{userData.balance} ₴</b></p>
        </>
      ) : (
        <p>Завантаження...</p>
      )}

      <form onSubmit={handleTransfer}>
        <input
          type="text"
          name="to"
          placeholder="Кому переказати"
          value={form.to}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="amount"
          placeholder="Сума"
          value={form.amount}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Переказати</button>
      </form>
    </div>
  )
}
