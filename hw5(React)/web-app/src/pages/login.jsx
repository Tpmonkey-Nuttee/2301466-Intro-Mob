import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import axios from 'axios'

const API = "http://localhost:5555"

function submit(username, password, setCookies, navigate) {
  axios.post(`${API}/tokens`, { userName: username, password: password })
    .then((response) => {
      setCookies("token", response.data.token)
      toast.success("Welcome back!")
      navigate("/main")
    })
    .catch((error) => {
      toast.error(error.response?.status + " " + error.response?.statusText || "Login failed")
    })
}

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setCookies] = useCookies(['token'])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password) return
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      submit(username, password, setCookies, navigate)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div className="animate-fadeup" style={{ width: '100%', maxWidth: '420px', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px', height: '64px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
            border: '1px solid rgba(201,168,76,0.3)',
            fontSize: '28px',
            marginBottom: '16px',
          }}>
            ◈
          </div>
          <h1 style={{
            fontFamily: 'DM Sans, serif',
            fontSize: '32px',
            fontWeight: '700',
            color: '#f0ece4',
            letterSpacing: '0.5px',
          }}>
            Activ<span style={{ color: '#c9a84c' }}>ity</span>
          </h1>
          <p style={{ color: '#a8b4c0', fontSize: '13px', marginTop: '6px', letterSpacing: '1.5px' }}>
            ACTIVITY MANAGER
          </p>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{
            fontFamily: 'DM Sans, serif',
            fontSize: '22px',
            color: '#f0ece4',
            marginBottom: '6px',
          }}>
            Sign in
          </h2>
          <p style={{ color: '#a8b4c0', fontSize: '13px', marginBottom: '28px' }}>
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '8px', width: '100%', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: '#a8b4c0',
          }}>
            <span>No account? <Link to="/signup">Sign up</Link></span>
            <Link to="/credit" style={{ color: '#a8b4c0' }}>Credits</Link>
          </div>
        </div>
      </div>
    </div>
  )
}