import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login.jsx'
import Main from './pages/main.jsx'
import Credit from './pages/credit.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="/credit" element={<Credit />} />
    </Routes>
  )
}