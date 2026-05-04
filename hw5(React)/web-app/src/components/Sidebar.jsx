import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { slide as Menu } from 'react-burger-menu'

const burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '28px',
    height: '22px',
    left: '20px',
    top: '20px',
    zIndex: 1000,
  },
  bmBurgerBars: {
    background: '#c9a84c',
    borderRadius: '2px',
    height: '2px',
  },
  bmBurgerBarsHover: {
    background: '#e8c97a',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    right: '20px',
    top: '20px',
  },
  bmCross: {
    background: '#a8b4c0',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1100,
  },
  bmMenu: {
    background: '#0d1b2a',
    borderRight: '1px solid rgba(201,168,76,0.2)',
    padding: '60px 0 24px',
    fontSize: '14px',
    overflowY: 'auto',
  },
  bmOverlay: {
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(4px)',
    top: 0,
    left: 0,
  },
}

const navItems = [
  { path: '/main',   icon: '◈', label: 'Activities' },
  { path: '/credit', icon: '◉', label: 'Credits' },
]

export default function Sidebar({ isLoggedIn }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const [, , removeCookie] = useCookies(['token'])

  const handleSignOut = () => {
    removeCookie('token')
    setOpen(false)
    navigate('/login')
  }

  return (
    <Menu
      styles={burgerStyles}
      isOpen={open}
      onStateChange={({ isOpen }) => setOpen(isOpen)}
      width={260}
    >
      <div style={{
        padding: '0 28px 32px',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        marginBottom: '16px',
      }}>
        <div style={{
          fontFamily: 'DM Sans, serif',
          fontSize: '22px',
          fontWeight: '700',
          color: '#c9a84c',
          letterSpacing: '1px',
        }}>
          Activ<span style={{ color: '#f0ece4' }}>ity</span>
        </div>
        <div style={{ fontSize: '11px', color: '#a8b4c0', marginTop: '4px', letterSpacing: '2px' }}>
          ACTIVITY MANAGER
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '4px',
              color: location.pathname === item.path ? '#c9a84c' : '#a8b4c0',
              background: location.pathname === item.path ? 'rgba(201,168,76,0.1)' : 'transparent',
              transition: 'all 0.2s',
              textDecoration: 'none',
              fontWeight: location.pathname === item.path ? '600' : '400',
            }}
          >
            <span style={{ fontSize: '16px' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      {isLoggedIn && (
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '16px',
          right: '16px',
        }}>
          <button
            onClick={handleSignOut}
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(224,92,92,0.1)',
              border: '1px solid rgba(224,92,92,0.25)',
              borderRadius: '10px',
              color: '#e05c5c',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            ⎋ Sign Out
          </button>
        </div>
      )}
    </Menu>
  )
}