import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [userid, setUserid] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // mockup only (ยังไม่เชื่อม API)
    navigate('/main')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
        <input
          placeholder="User ID"
          value={userid}
          onChange={(e) => setUserid(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button>
      </form>

      <p style={{ marginTop: 16 }}>
        ไปหน้าเครดิตได้ที่ <Link to="/credit">Credit</Link>
      </p>
    </div>
  )
}