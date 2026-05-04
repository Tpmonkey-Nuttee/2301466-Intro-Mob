import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const API = "http://localhost:5555"

export default function Signup() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters")
      return
    }
    setLoading(true)
    axios.post(`${API}/users`, { userName: username, password })
      .then(() => {
        toast.success("Account created! Please sign in.")
        navigate('/login')
      })
      .catch((err) => {
        if (err.response?.status === 409) toast.error("Username already taken")
        else toast.error("Something went wrong")
      })
      .finally(() => setLoading(false))
  }

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3

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
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05))',
            border: '1px solid rgba(201,168,76,0.3)', fontSize: '28px', marginBottom: '16px',
          }}>
            ◉
          </div>
          <h1 style={{ fontFamily: 'DM Sans, serif', fontSize: '32px', fontWeight: '700', color: '#f0ece4' }}>
            Activ<span style={{ color: '#c9a84c' }}>ity</span>
          </h1>
          <p style={{ color: '#a8b4c0', fontSize: '13px', marginTop: '6px', letterSpacing: '1.5px' }}>
            CREATE ACCOUNT
          </p>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif, serif', fontSize: '22px', color: '#f0ece4', marginBottom: '6px' }}>
            Get started
          </h2>
          <p style={{ color: '#a8b4c0', fontSize: '13px', marginBottom: '28px' }}>
            Create your free account today
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>
                USERNAME
              </label>
              <input
                type="text"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{
                      flex: 1, height: '3px', borderRadius: '2px',
                      background: i <= strength
                        ? (strength === 1 ? '#e05c5c' : strength === 2 ? '#c9a84c' : '#4caf87')
                        : 'rgba(255,255,255,0.08)',
                      transition: 'all 0.3s',
                    }} />
                  ))}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  borderColor: confirmPassword && confirmPassword !== password
                    ? 'rgba(224,92,92,0.5)' : undefined
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '8px', width: '100%', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <div style={{
            marginTop: '24px', paddingTop: '24px',
            borderTop: '1px solid rgba(201,168,76,0.1)',
            textAlign: 'center', fontSize: '13px', color: '#a8b4c0',
          }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}