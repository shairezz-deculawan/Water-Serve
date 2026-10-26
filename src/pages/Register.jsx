import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Droplets, Hash, User, Phone, Mail, Lock, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react'
import './Auth.css'

const INITIAL_FORM = {
  accountNumber: '',
  fullName: '',
  contactNumber: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL_FORM)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | verifying | success

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please fill in every field.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    // Prototype only: simulate a CCWD account-number verification check.
    // No real database lookup happens here.
    setStatus('verifying')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        navigate('/login')
      }, 1400)
    }, 1200)
  }

  if (status === 'verifying' || status === 'success') {
    return (
      <div className="auth">
        <div className="auth__panel">
          <div className="verify-state">
            {status === 'verifying' ? (
              <>
                <span className="verify-state__icon verify-state__icon--loading">
                  <Loader2 size={26} />
                </span>
                <h1 className="auth__title">Verifying your CCWD account…</h1>
                <p className="auth__sub">
                  Matching account number <strong>{form.accountNumber}</strong> against CCWD
                  records.
                </p>
              </>
            ) : (
              <>
                <span className="verify-state__icon verify-state__icon--success">
                  <ShieldCheck size={26} />
                </span>
                <h1 className="auth__title">Account verified</h1>
                <p className="auth__sub">
                  Welcome, {form.fullName.split(' ')[0] || 'there'}. Redirecting you to log in…
                </p>
              </>
            )}
          </div>
        </div>
        <div className="auth__side" aria-hidden="true">
          <div className="auth__side-card">
            <p className="eyebrow">Get started</p>
            <h2>Set up in minutes</h2>
            <p>
              Enter your meter number once and manage bills and incident
              reports online for good.
            </p>
          </div>
        </div>
      </div>
    )
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

        <h1 className="auth__title">Create your account</h1>
        <p className="auth__sub">
          Link your CCWD water meter to get started.
        </p>

        <div className="verify-note">
          <ShieldCheck size={17} />
          <span>
            Your CCWD account number will be verified against the registered
            account information.
          </span>
        </div>

        <form className="auth__form" onSubmit={handleSubmit}>
          <label className="auth__field">
            <span>CCWD account number</span>
            <div className="auth__input">
              <Hash size={17} />
              <input
                type="text"
                name="accountNumber"
                placeholder="CCWD-000000"
                value={form.accountNumber}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <span>Full name</span>
            <div className="auth__input">
              <User size={17} />
              <input
                type="text"
                name="fullName"
                placeholder="Juan Dela Cruz"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <span>Contact number</span>
            <div className="auth__input">
              <Phone size={17} />
              <input
                type="tel"
                name="contactNumber"
                placeholder="09XX XXX XXXX"
                value={form.contactNumber}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <span>Email address</span>
            <div className="auth__input">
              <Mail size={17} />
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <span>Password</span>
            <div className="auth__input">
              <Lock size={17} />
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          </label>

          <label className="auth__field">
            <span>Confirm password</span>
            <div className="auth__input">
              <Lock size={17} />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </label>

          {error && <p className="auth__error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block">
            Create account
          </button>
        </form>

        <p className="auth__foot">
          Already registered? <Link to="/login">Log in</Link>
        </p>
      </div>

      <div className="auth__side" aria-hidden="true">
        <div className="auth__side-card">
          <p className="eyebrow">Get started</p>
          <h2>Set up in minutes</h2>
          <p>
            Enter your meter number once and manage bills and incident
            reports online for good.
          </p>
        </div>
      </div>
    </div>
  )
}