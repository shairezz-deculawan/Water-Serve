import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileWarning,
  Users,
  Receipt,
  Wrench,
  LogOut,
  Droplets,
} from 'lucide-react'
import './AdminSidebar.css'

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/incidents', label: 'Incidents', icon: FileWarning },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/billing', label: 'Billing', icon: Receipt },
  { to: '/admin/maintenance', label: 'Maintenance', icon: Wrench },
]

export default function AdminSidebar({ isOpen = false, onNavigate }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Prototype only: no real session exists, so logging out just
    // returns to the login screen.
    navigate('/login')
  }

  return (
    <aside className={`asidebar ${isOpen ? 'is-open' : ''}`}>
      <div className="asidebar__brand">
        <span className="asidebar__logo">
          <Droplets size={18} strokeWidth={2.25} />
        </span>
        <span>
          WaterServe
          <small>Admin Console</small>
        </span>
      </div>

      <nav className="asidebar__nav">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) => `asidebar__link ${isActive ? 'is-active' : ''}`}
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="asidebar__logout" onClick={handleLogout}>
        <LogOut size={18} strokeWidth={2} />
        <span>Logout</span>
      </button>
    </aside>
  )
}