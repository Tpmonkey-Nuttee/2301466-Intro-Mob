import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Main() {
  const navigate = useNavigate()

  const [activities, setActivities] = useState([
    { id: 1, title: 'ประชุมทีม', datetime: '2026-04-02 10:00' },
    { id: 2, title: 'แก้ไข UI หน้า Login', datetime: '2026-04-02 13:30' },
    { id: 3, title: 'รีวิวงานและสรุป', datetime: '2026-04-02 16:00' },
  ])

  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')

  const handleAdd = () => {
    if (!title.trim() || !datetime.trim()) return

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      datetime: datetime.trim(),
    }

    setActivities((prev) => [...prev, newItem])
    setTitle('')
    setDatetime('')
  }

  const handleDelete = (id) => {
    setActivities((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Main</h1>
      <h3>กิจกรรม</h3>

      {/* ฟอร์มเพิ่มกิจกรรม */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="ชื่อกิจกรรม"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="วันเวลา เช่น 2026-04-02 18:00"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />
        <button onClick={handleAdd}>เพิ่มกิจกรรม</button>
      </div>

      <ul>
        {activities.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.title} — <small>{item.datetime}</small>{' '}
            <button onClick={() => handleDelete(item.id)}>ลบ</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Link to="/credit">ไปหน้า Credit</Link>
        <button onClick={() => navigate('/login')}>Sign out</button>
      </div>
    </div>
  )
}