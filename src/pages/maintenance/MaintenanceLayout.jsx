import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import MaintenanceSidebar from './MaintenanceSidebar.jsx'
import { MAINTENANCE_STAFF } from './maintenanceData.js'
import './MaintenanceLayout.css'

export default function MaintenanceLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="mlayout">
      <MaintenanceSidebar isOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />

      {mobileOpen && (
        <button
          type="button"
          className="mlayout__scrim"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="mlayout__main">
        <header className="mlayout__topbar">
          <button
            type="button"
            className="mlayout__menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="mlayout__topbar-title">Maintenance Portal</div>
          <div className="mlayout__topbar-user">
            <span className="mlayout__avatar">{MAINTENANCE_STAFF.name.charAt(0)}</span>
            <span className="mlayout__username">{MAINTENANCE_STAFF.name}</span>
          </div>
        </header>

        <div className="mlayout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}