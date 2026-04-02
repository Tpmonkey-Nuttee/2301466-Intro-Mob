import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const API = "http://localhost:5555"

export default function Main() {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const [activities, setActivities] = useState([])
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDatetime, setEditDatetime] = useState('')

  const authHeader = { headers: { Authorization: `Bearer ${cookies.token}` } }

useEffect(() => {
  axios.get(`${API}/activities`, authHeader)
    .then((res) => {
      if (res.status === 204) return
      setActivities(res.data)
    })
    .catch((err) => {
      if (err.response?.status === 401) navigate('/login')
      else toast.error("Failed to load activities")
    })
}, [])

  const handleAdd = () => {
    if (!title.trim() || !datetime.trim()) return
    axios.post(`${API}/activities`, { name: title.trim(), when: datetime.trim() }, authHeader)
      .then((res) => {
        setActivities((prev) => [...prev, { id: res.data.id, name: title.trim(), when: datetime.trim() }])
        setTitle('')
        setDatetime('')
        toast.success("Added new activity")
      })
      .catch(() => toast.error("Failed to add activity"))
  }

  const handleDelete = (id) => {
    axios.delete(`${API}/activities/${id}`, authHeader)
      .then(() => {
        setActivities((prev) => prev.filter((item) => item.id !== id))
        toast.success("Sucessfully delete activity")
      }).catch(() => toast.error("Failed to delete activity"))
  }

  const handleEditStart = (item) => {
    setEditingId(item.id)
    setEditTitle(item.name)
    setEditDatetime(item.when)
  }

  const handleEditSave = (id) => {
    if (!editTitle.trim() || !editDatetime.trim()) return
    axios.put(`${API}/activities/${id}`, { name: editTitle.trim(), when: editDatetime.trim() }, authHeader)
      .then(() => {
        setActivities((prev) => prev.map((item) =>
          item.id === id ? { ...item, name: editTitle.trim(), when: editDatetime.trim() } : item
        ))
        setEditingId(null)
        toast.success("Saved")
      })
      .catch(() => toast.error("Failed to update activity"))
  }

  const handleSignOut = () => {
    toast.success("Logging out...")
    removeCookie('token')
    navigate('/login')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Main</h1>
      <h3>Your Activities</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Activity name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={datetime.split('T')[0]}
          onChange={(e) => setDatetime(e.target.value + 'T' + (datetime.split('T')[1] || '00:00'))}
        />
        <input
          type="time"
          value={datetime.split('T')[1] || '00:00'}
          onChange={(e) => setDatetime((datetime.split('T')[0] || '') + 'T' + e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {activities.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {editingId === item.id ? (
              <>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input
                  type="date"
                  value={editDatetime.split('T')[0]}
                  onChange={(e) => setEditDatetime(e.target.value + 'T' + (editDatetime.split('T')[1] || '00:00'))}
                />
                <input
                  type="time"
                  value={editDatetime.split('T')[1] || '00:00'}
                  onChange={(e) => setEditDatetime((editDatetime.split('T')[0] || '') + 'T' + e.target.value)}
                />
                <button onClick={() => handleEditSave(item.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.name} — <small>{new Date(item.when).toLocaleString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}</small>{' '}
                <button onClick={() => handleEditStart(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Link to="/credit">Go to Credit</Link>
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  )
}