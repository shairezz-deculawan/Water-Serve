import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, IdCard, Lock, ArrowLeft, Users, ShieldCheck, Wrench } from 'lucide-react'
import './Auth.css'

const ROLES = [
  { id: 'customer', label: 'Customer', icon: Users, redirect: '/customer' },
  { id: 'admin', label: 'CCWD Administrative Staff', icon: ShieldCheck, redirect: '/admin' },
  { id: 'maintenance', label: 'CCWD Maintenance Staff', icon: Wrench, redirect: '/maintenance' },
]

// Fictional demo accounts for the prototype only — no real backend is connected.
const DEMO_ACCOUNTS = {
  customer: { id: 'CCWD-004821 or juan.delacruz@email.com', password: 'customer123' },
  admin: { id: 'admin.staff@ccwd.gov.ph', password: 'admin123' },
  maintenance: { id: 'maintenance.crew@ccwd.gov.ph', password: 'maintenance123' },
}

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.identifier || !form.password) {
      setError('Please enter your account number/email and password.')
      return
    }

    // Prototype only: no real authentication happens here. Any credentials
    // are accepted and the user is routed to the dashboard for the role
    // they selected above.
    setError('')
    const selectedRole = ROLES.find((r) => r.id === role)
    navigate(selectedRole.redirect, { state: { identifier: form.identifier, role } })
  }

  const fillDemo = (roleId) => {
    const demo = DEMO_ACCOUNTS[roleId]
    setRole(roleId)
    setForm({ identifier: demo.id, password: demo.password })
    setError('')
  }

  return (
    <div className="auth">
      <div className="auth__panel">
        <Link to="/" className="auth__back">
          <ArrowLeft size={16} /> Back to WaterServe
        </Link>

        <div className="auth__brand">
          <span className="auth__logo">
            <Droplets size={20} strokeWidth={2.25} />
          </span>
          WaterServe
        </div>

        <h1 className="auth__title">Log in to your account</h1>
        <p className="auth__sub">
          Check your bill and manage your incident reports.
        </p>

        <div className="role-select">
          <span className="role-select__label">Log in as</span>
          <div className="role-select__options">
            {ROLES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`role-option ${role === id ? 'is-active' : ''}`}
                onClick={() => setRole(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__field">
            <span>Account number / Email</span>
            <div className="auth__input">
              <IdCard size={17} />
              <input
                type="text"
                name="identifier"
                placeholder="CCWD-000000 or you@email.com"
                value={form.identifier}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <div className="auth__field-row">
              <span>Password</span>
              <Link to="/forgot-password" className="auth__inline-link">
                Forgot password?
              </Link>
            </div>
            <div className="auth__input">
              <Lock size={17} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </label>

          {error && <p className="auth__error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Log in
          </button>
        </form>

        <div className="demo-box">
          <p className="demo-box__title">Prototype demo accounts</p>
          <p className="demo-box__hint">Tap a role to autofill fictional demo credentials.</p>
          <div className="demo-box__list">
            {ROLES.map(({ id, label }) => (
              <button key={id} type="button" className="demo-box__item" onClick={() => fillDemo(id)}>
                <span>{label}</span>
                <span className="demo-box__creds">
                  {DEMO_ACCOUNTS[id].id} / {DEMO_ACCOUNTS[id].password}
                </span>
              </button>
            ))}
          </div>
        </div>

        <p className="auth__foot">
          Don&apos;t have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>

      <div className="auth__side" aria-hidden="true">
        <div className="auth__side-card">
          <p className="eyebrow">Concessionaire access</p>
          <h2>Your account, your service history</h2>
          <p>
            Sign in to view meter readings, past bills, and every incident
            you&apos;ve reported to CCWD.
          </p>
        </div>
      </div>
    </div>
  )
}