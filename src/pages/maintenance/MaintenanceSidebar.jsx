import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, Bell, UserRound, LogOut, Droplets } from 'lucide-react'
import './MaintenanceSidebar.css'

const NAV_ITEMS = [
  { to: '/maintenance', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/maintenance/orders', label: 'My Work Orders', icon: ClipboardList },
  { to: '/maintenance/notifications', label: 'Notifications', icon: Bell },
  { to: '/maintenance/profile', label: 'Profile', icon: UserRound },
]

export default function MaintenanceSidebar({ isOpen = false, onNavigate }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <aside className={`msidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="msidebar__brand">
        <span className="msidebar__logo">
          <Droplets size={18} strokeWidth={2.25} />
        </span>
        <span>
          WaterServe
          <small>Maintenance Portal</small>
        </span>
      </div>

      <nav className="msidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `msidebar__link ${isActive ? 'is-active' : ''}`}
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="msidebar__logout" onClick={handleLogout}>
        <LogOut size={18} strokeWidth={2} />
        <span>Logout</span>
      </button>
    </aside>
  )
}