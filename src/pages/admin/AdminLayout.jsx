import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import AdminSidebar from './AdminSidebar.jsx'
import './AdminLayout.css'

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="alayout">
      <AdminSidebar isOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />

      {mobileOpen && (
        <button
          type="button"
          className="alayout__scrim"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="alayout__main">
        <header className="alayout__topbar">
          <button
            type="button"
            className="alayout__menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="alayout__topbar-title">Admin Console</div>
          <div className="alayout__topbar-user">
            <span className="alayout__avatar">A</span>
            <span className="alayout__username">CCWD Administrative Staff</span>
          </div>
        </header>

        <div className="alayout__content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}