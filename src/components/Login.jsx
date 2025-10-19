import { useState } from 'react'

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data.message)
        return
      }

      alert(data.message)
      onLoginSuccess()
    } catch (err) {
      console.error(err)
      alert('Помилка при вході')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Логін</h2>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Увійти</button>
    </form>
  )
}
