import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import './App.css'
import UserProfile from './components/UserProfile'
import Payment from './components/Payment'
import { useState } from 'react'

class FormStorage {
  constructor(key) {
    this.key = key
  }

  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  load() {
    const saved = localStorage.getItem(this.key)
    return saved ? JSON.parse(saved) : null
  }

  clear() {
    localStorage.removeItem(this.key)
  }
}

function App() {
  const storage = new FormStorage('userData')
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
    email: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    storage.save(form)
    setIsSubmitted(true)
    navigate('/Payment')
  }

  return (
    <div>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Реєстрація</h2>
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
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Зареєструватись</button>
        </form>
      ) : (
        <div>
          <nav>
            <Link to="/UserProfile">Marketplace</Link>
            <Link to="/Payment">Rankings</Link>
          </nav>

          <Routes>
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/Payment" element={<Payment />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
