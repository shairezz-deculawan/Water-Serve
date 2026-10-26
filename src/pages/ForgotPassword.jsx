import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Mail, ArrowLeft, MailCheck } from 'lucide-react'
import './Auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // Prototype only: no email is actually sent.
    setSent(true)
  }

  return (
    <div className="auth">
      <div className="auth__panel">
        <Link to="/login" className="auth__back">
          <ArrowLeft size={16} /> Back to log in
        </Link>

        <div className="auth__brand">
          <span className="auth__logo">
            <Droplets size={20} strokeWidth={2.25} />
          </span>
          WaterServe
        </div>

        {sent ? (
          <div className="verify-state" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <span className="verify-state__icon verify-state__icon--success">
              <MailCheck size={26} />
            </span>
            <h1 className="auth__title">Check your inbox</h1>
            <p className="auth__sub">
              If <strong>{email}</strong> matches a WaterServe account, we&apos;ve sent a link
              to reset your password. (Prototype only — no email was actually sent.)
            </p>
          </div>
        ) : (
          <>
            <h1 className="auth__title">Reset your password</h1>
            <p className="auth__sub">
              Enter the email linked to your CCWD account and we&apos;ll send you a reset link.
            </p>

            <form className="auth__form" onSubmit={handleSubmit}>
              <label className="auth__field">
                <span>Email address</span>
                <div className="auth__input">
                  <Mail size={17} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              <button type="submit" className="btn btn-primary btn-block">
                Send reset link
              </button>
            </form>
          </>
        )}

        <p className="auth__foot">
          Remembered your password? <Link to="/login">Log in</Link>
        </p>
      </div>

      <div className="auth__side" aria-hidden="true">
        <div className="auth__side-card">
          <p className="eyebrow">Account recovery</p>
          <h2>We&apos;ll get you back in</h2>
          <p>Password resets are sent to the email address on file with your CCWD account.</p>
        </div>
      </div>
    </div>
  )
}