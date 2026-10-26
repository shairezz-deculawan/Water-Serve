import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Receipt,
  History,
  FileWarning,
  ClipboardList,
  Bell,
  UserRound,
  LogOut,
  Droplets,
} from 'lucide-react'
import './CustomerSidebar.css'

const NAV_ITEMS = [
  { to: '/customer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/customer/bill', label: 'My Bill', icon: Receipt },
  { to: '/customer/payments', label: 'Payment History', icon: History },
  { to: '/customer/report', label: 'Report an Issue', icon: FileWarning },
  { to: '/customer/reports', label: 'My Reports', icon: ClipboardList },
  { to: '/customer/notifications', label: 'Notifications', icon: Bell },
  { to: '/customer/profile', label: 'Profile', icon: UserRound },
]

export default function CustomerSidebar({ unreadCount = 0, onNavigate }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Prototype only: no real session exists, so logging out just
    // returns to the login screen.
    navigate('/login')
  }

  return (
    <aside className="csidebar">
      <div className="csidebar__brand">
        <span className="csidebar__logo">
          <Droplets size={18} strokeWidth={2.25} />
        </span>
        <span>
          WaterServe
          <small>Customer Portal</small>
        </span>
      </div>

      <nav className="csidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `csidebar__link ${isActive ? 'is-active' : ''}`}
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
            {label === 'Notifications' && unreadCount > 0 && (
              <span className="csidebar__badge">{unreadCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <button type="button" className="csidebar__logout" onClick={handleLogout}>
        <LogOut size={18} strokeWidth={2} />
        <span>Logout</span>
      </button>
    </aside>
  )
}