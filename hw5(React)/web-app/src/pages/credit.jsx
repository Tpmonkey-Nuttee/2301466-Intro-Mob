import { Link, useNavigate } from 'react-router-dom'

export default function Credit() {
  const navigate = useNavigate()

  const members = ['6634475423 สุภเดช อนุพันธ์', 'เขียนชื่อ']

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
        <Link to="/main">กลับหน้า Main</Link>
        <button onClick={() => navigate('/login')}>Sign out</button>
      </div>
    </div>
  )
}