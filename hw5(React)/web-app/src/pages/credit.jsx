import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Sidebar from '../components/Sidebar.jsx'

export default function Credit() {
  const navigate = useNavigate()
  const [cookies, , removeCookie] = useCookies(['token'])
  const isLoggedIn = !!cookies.token

  const members = [
    { id: '6634475423', name: 'สุภเดช อนุพันธ์', role: 'Comsci' },
    { id: '6634429623', name: 'นนท์อนันต์ อรุณรัตนา', role: 'Comsci' },
    { id: '6634432423', name: 'นัทที เอื้อพีระนันท์', role: 'Comsci' },
  ]


    return (
      <div className="page-wrapper">
        <Sidebar isLoggedIn={isLoggedIn} />
  
        <div style={{ padding: '32px 32px 60px 72px', maxWidth: '800px' }}>
          <div className="animate-fadeup" style={{ marginBottom: '40px' }}>
            <p style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '2px', marginBottom: '8px' }}>
              ABOUT
            </p>
            <h1 style={{ fontFamily: 'DM Sans, serif', fontSize: '36px', fontWeight: '700', color: '#f0ece4' }}>
              Credits
            </h1>
            <p style={{ color: '#a8b4c0', marginTop: '8px', fontSize: '14px', lineHeight: '1.7' }}>
              This project was created as part of a course assignment. Meet the team behind Activity.
            </p>
          </div>
  
          <div className="animate-fadeup-delay-1" style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: 'DM Sans, serif', fontSize: '20px',
              color: '#c9a84c', marginBottom: '20px',
            }}>
              Team Members
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {members.map((member, i) => (
                <div key={i} className="card" style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  animation: `fadeUp 0.5s ${0.1 + i * 0.1}s ease both`,
                }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.05))',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'DM Sans, serif', fontSize: '18px', color: '#c9a84c',
                    flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#f0ece4', fontSize: '15px' }}>
                      {member.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#a8b4c0', marginTop: '2px' }}>
                      {member.role}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '12px', color: '#a8b4c0',
                    background: 'rgba(255,255,255,0.04)',
                    padding: '4px 12px', borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    {member.id}
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          <div style={{ marginTop: '40px', display: 'flex', gap: '12px' }}>
            {isLoggedIn ? (
              <>
                <Link to="/main">
                  <button className="btn-primary">← Back to Activities</button>
                </Link>
                <button className="btn-ghost" onClick={() => { removeCookie('token'); navigate('/login') }}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn-primary">← Back to Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }