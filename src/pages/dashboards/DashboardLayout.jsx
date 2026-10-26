import { Link, useLocation } from 'react-router-dom'
import { Droplets, LogOut } from 'lucide-react'
import './Dashboard.css'

export default function DashboardLayout({ roleLabel, badgeColor, children }) {
  const location = useLocation()
  const identifier = location.state?.identifier

  return (
    <div className="dash">
      <header className="dash__bar">
        <Link to="/" className="dash__brand">
          <span className="dash__logo">
            <Droplets size={18} strokeWidth={2.25} />
          </span>
          WaterServe
        </Link>

        <div className="dash__bar-right">
          <span className="dash__badge" style={{ background: badgeColor }}>
            {roleLabel}
          </span>
          {identifier && <span className="dash__identifier">{identifier}</span>}
          <Link to="/login" className="btn btn-ghost dash__logout">
            <LogOut size={16} /> Log out
          </Link>
        </div>
      </header>

      <main className="dash__content">{children}</main>
    </div>
  )
}