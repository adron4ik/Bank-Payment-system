import { Route, Routes, NavLink, useNavigate } from 'react-router-dom'
import './App.css'
import UserProfile from './components/UserProfile'
import Payment from './components/Payment'
import Login from './components/Login'
import { useState } from 'react'

function App() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true')
  const [form, setForm] = useState({ username: '', password: '', email: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message); return }
      alert(data.message)
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/UserProfile')
    } catch (err) {
      console.error(err)
      alert('Помилка при реєстрації')
    }
  }

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
    navigate('/UserProfile')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
    navigate('/login')
  }

  return (
    <div>
      {!isLoggedIn ? (
        <div className="auth-container">
          <div className="tabs">
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Реєстрація</NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Логін</NavLink>
          </div>

          <Routes>
            <Route
              path="/register"
              element={
                <form onSubmit={handleRegister}>
                  <h2>Реєстрація</h2>
                  <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                  <br />
                  <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                  <br />
                  <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                  <br />
                  <button type="submit">Зареєструватись</button>
                </form>
              }
            />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        </div>
      ) : (
        <div className="main-container">
          <nav>
            <NavLink to="/UserProfile" className={({ isActive }) => isActive ? 'active' : ''}>Профіль</NavLink>
            <NavLink to="/Payment" className={({ isActive }) => isActive ? 'active' : ''}>Перекази</NavLink>
            <button className="logout-btn" onClick={handleLogout}>Вийти</button>
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
