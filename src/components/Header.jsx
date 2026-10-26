import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Menu, X } from 'lucide-react'
import './Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__row">
        <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
          <span className="header__logo">
            <Droplets size={20} strokeWidth={2.25} />
          </span>
          <span className="header__wordmark">
            WaterServe
            <span className="header__submark">CCWD Portal</span>
          </span>
        </Link>

        <nav className={`header__nav ${open ? 'is-open' : ''}`}>
          <a href="/#home" onClick={() => setOpen(false)}>Home</a>
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a href="/#services" onClick={() => setOpen(false)}>Services</a>
          <div className="header__actions header__actions--mobile">
            <Link to="/login" className="btn btn-outline" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" className="btn btn-primary" onClick={() => setOpen(false)}>Register</Link>
          </div>
        </nav>

        <div className="header__actions">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>

        <button
          className="header__toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}