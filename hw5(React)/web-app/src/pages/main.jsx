import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Sidebar from '../components/Sidebar.jsx'

const API = "http://localhost:5555"
 
const darkTheme = createTheme({
  palette: { mode: 'dark' },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: { border: 'none', fontFamily: 'DM Sans, sans-serif', color: '#f0ece4', backgroundColor: 'transparent' },
        columnHeaders: { backgroundColor: 'rgba(13,27,42,0.9)', borderBottom: '1px solid rgba(201,168,76,0.2)' },
        columnHeaderTitle: { color: '#a8b4c0', fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase' },
        row: {
          '&:nth-of-type(even)': { backgroundColor: 'rgba(27,45,66,0.4)' },
          '&:nth-of-type(odd)': { backgroundColor: 'rgba(27,45,66,0.2)' },
          '&:hover': { backgroundColor: 'rgba(201,168,76,0.06) !important' },
        },
        cell: { borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '14px' },
        footerContainer: { borderTop: '1px solid rgba(201,168,76,0.15)', backgroundColor: 'rgba(13,27,42,0.8)' },
      },
    },
  },
})
 
export default function Main() {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('09:00')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')
 
  const authHeader = { headers: { Authorization: `Bearer ${cookies.token}` } }
 
  useEffect(() => {
    axios.get(`${API}/activities`, authHeader)
      .then((res) => { if (res.status === 204) return; setActivities(res.data) })
      .catch((err) => { if (err.response?.status === 401) navigate('/login'); else toast.error("Failed to load activities") })
      .finally(() => setLoading(false))
  }, [])
 
  const handleAdd = () => {
    if (!title.trim() || !date.trim()) { toast.error("Please fill in activity name and date"); return }
    setAdding(true)
    const when = `${date}T${time}`
    axios.post(`${API}/activities`, { name: title.trim(), when }, authHeader)
      .then((res) => { setActivities(prev => [...prev, { id: res.data.id, name: title.trim(), when }]); setTitle(''); setDate(''); setTime('09:00'); toast.success("Activity added!") })
      .catch(() => toast.error("Failed to add activity"))
      .finally(() => setAdding(false))
  }
 
  const handleEditStart = (row) => {
    setEditingId(row.id); setEditTitle(row.name)
    setEditDate(row.when?.split('T')[0] || ''); setEditTime(row.when?.split('T')[1] || '09:00')
  }
 
  const handleEditSave = (id) => {
    const when = `${editDate}T${editTime}`
    axios.put(`${API}/activities/${id}`, { name: editTitle.trim(), when }, authHeader)
      .then(() => { setActivities(prev => prev.map(a => a.id === id ? { ...a, name: editTitle.trim(), when } : a)); setEditingId(null); toast.success("Saved!") })
      .catch(() => toast.error("Update failed"))
  }
 
  const handleDelete = (id) => {
    axios.delete(`${API}/activities/${id}`, authHeader)
      .then(() => { setActivities(prev => prev.filter(a => a.id !== id)); toast.success("Deleted") })
      .catch(() => toast.error("Delete failed"))
  }
 
  const columns = [
    {
      field: 'name', headerName: 'Activity', flex: 1, minWidth: 180,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c9a84c', flexShrink: 0 }} />
          <span style={{ fontWeight: '500' }}>{params.value}</span>
        </div>
      ),
    },
    {
      field: 'when', headerName: 'Date & Time', flex: 1, minWidth: 200,
      renderCell: (params) => (
        <span style={{ color: '#a8b4c0', fontSize: '13px' }}>
          {params.value ? new Date(params.value).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
        </span>
      ),
    },
    {
      field: 'actions', headerName: 'Actions', width: 160, sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-success" style={{ padding: '5px 12px', fontSize: '12px' }} onClick={() => handleEditStart(params.row)}>Edit</button>
          <button className="btn-danger" style={{ padding: '5px 12px', fontSize: '12px' }} onClick={() => handleDelete(params.row.id)}>Delete</button>
        </div>
      ),
    },
  ]
 
  return (
    <div className="page-wrapper">
      <Sidebar isLoggedIn={!!cookies.token} />
      <div style={{ padding: '32px 32px 32px 72px', maxWidth: '1000px' }}>
 
        <div className="animate-fadeup" style={{ marginBottom: '32px' }}>
          <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' }}>DASHBOARD</p>
          <h1 style={{ fontFamily: 'DM Sans, serif', fontSize: '36px', fontWeight: '700', color: '#f0ece4' }}>Your Activities</h1>
          <p style={{ color: '#a8b4c0', marginTop: '6px', fontSize: '14px' }}>{activities.length} {activities.length === 1 ? 'activity' : 'activities'} tracked</p>
        </div>
 
        {editingId && (
          <div className="card animate-fadeup" style={{ padding: '20px 24px', marginBottom: '16px', borderColor: 'rgba(201,168,76,0.4)' }}>
            <p style={{ fontSize: '12px', color: '#c9a84c', letterSpacing: '1px', marginBottom: '12px' }}>EDITING ACTIVITY</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '1 1 180px' }}><input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Activity name" /></div>
              <div style={{ flex: '0 1 150px' }}><input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} /></div>
              <div style={{ flex: '0 1 120px' }}><input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} /></div>
              <button className="btn-primary" onClick={() => handleEditSave(editingId)} style={{ padding: '12px 20px' }}>Save</button>
              <button className="btn-ghost" onClick={() => setEditingId(null)} style={{ padding: '12px 20px' }}>Cancel</button>
            </div>
          </div>
        )}
 
        <div className="card animate-fadeup-delay-1" style={{ padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'DM Sans, serif', fontSize: '16px', color: '#f0ece4', marginBottom: '16px' }}>Add New Activity</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>ACTIVITY NAME</label>
              <input type="text" placeholder="e.g. Team meeting" value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} />
            </div>
            <div style={{ flex: '0 1 160px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>DATE</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div style={{ flex: '0 1 130px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#a8b4c0', marginBottom: '8px', letterSpacing: '0.8px' }}>TIME</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={handleAdd} disabled={adding} style={{ flexShrink: 0, padding: '12px 24px', whiteSpace: 'nowrap' }}>
              {adding ? '...' : '+ Add'}
            </button>
          </div>
        </div>
 
        <div className="animate-fadeup-delay-2" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(27,45,66,0.6)', backdropFilter: 'blur(12px)' }}>
          <ThemeProvider theme={darkTheme}>
            <DataGrid
              rows={activities}
              columns={columns}
              loading={loading}
              autoHeight
              pageSizeOptions={[5, 10, 20]}
              initialState={{ pagination: { paginationModel: { pageSize: 8 } } }}
              disableRowSelectionOnClick
              sx={{ border: 'none' }}
              slots={{
                noRowsOverlay: () => (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '120px', color: '#a8b4c0' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>◌</div>
                    <p style={{ fontSize: '14px' }}>No activities yet. Add one above!</p>
                  </div>
                ),
              }}
            />
          </ThemeProvider>
        </div>
 
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/credit" style={{ color: '#a8b4c0', fontSize: '13px' }}>View Credits →</Link>
        </div>
      </div>
    </div>
  )
}