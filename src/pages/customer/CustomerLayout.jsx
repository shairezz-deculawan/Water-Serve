import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import CustomerSidebar from './CustomerSidebar.jsx'
import { customerProfile } from './mockData.js'
import { getReportNotifications } from './reportsStore.js'
import './CustomerLayout.css'

export default function CustomerLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const unreadCount = getReportNotifications().filter((n) => !n.read).length

  return (
    <div className="clayout">
      <div className={`csidebar-wrap ${mobileOpen ? 'is-open' : ''}`}>
        <CustomerSidebar unreadCount={unreadCount} onNavigate={() => setMobileOpen(false)} />
      </div>

      {mobileOpen && (
        <button
          type="button"
          className="clayout__scrim"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="clayout__main">
        <header className="clayout__topbar">
          <button
            type="button"
            className="clayout__menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="clayout__topbar-title">Customer Portal</div>
          <div className="clayout__topbar-user">
            <span className="clayout__avatar">{customerProfile.name.charAt(0)}</span>
            <span className="clayout__username">{customerProfile.name}</span>
          </div>
        </header>

        <div className="clayout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}