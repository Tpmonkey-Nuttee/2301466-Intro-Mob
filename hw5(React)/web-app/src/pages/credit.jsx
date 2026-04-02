import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export default function Credit() {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const isLoggedIn = !!cookies.token

  const members = ['6634475423 สุภเดช อนุพันธ์', '6634429623 นนท์อนันต์ อรุณรัตนา', '6634432423 นัทที เอื้อพีระนันท์']

  return (
    <div style={{ padding: 24 }}>
      <h1>Credit</h1>
      <p>คณะผู้จัดทำ</p>
      <ul>
        {members.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        {isLoggedIn ? (
          <>
            <Link to="/main">Go to Main</Link>
            <button onClick={() => { removeCookie('token'); navigate('/login') }}>Sign out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  )
}