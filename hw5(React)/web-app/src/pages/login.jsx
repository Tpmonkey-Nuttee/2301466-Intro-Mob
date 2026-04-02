import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useCookies } from 'react-cookie'
import axios from 'axios'

function submit(username, password, setCookies, navigate) {
  axios.post(
    "http://localhost:5555/tokens", {userName: username, password: password}
  ).then((response) => {
    console.log(response)
    setCookies("token", response.data.token)
    toast.success("Logging in...")
    navigate("/main")
  }).catch((error) => {
    console.log(error)
    toast.error(error.response.status + " " + error.response.statusText)
  })
}

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setCookies] = useCookies(['token'])


  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // mockup only (ยังไม่เชื่อม API)
  //   navigate('/main')
  // }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={(e) => {e.preventDefault(); submit(username, password, setCookies, navigate)}} style={{ display: 'grid', gap: 12, maxWidth: 320 }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        Don't have an account? <Link to="/signup">Sign up</Link>
        <br></br>
        Credit page: <Link to="/credit">Credit</Link>
      </p>
    </div>
  )
}