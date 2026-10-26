import { Link } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__row">
        <div className="hero__copy">
          <p className="eyebrow">Calbayog City Water District</p>
          <h1 className="hero__headline">
            Your water service,<br />made easier.
          </h1>
          <p className="hero__sub">
            Check your water bill, report water supply problems, and track
            your service incidents online — no more waiting in line at the
            district office.
          </p>
          <div className="hero__cta">
            <Link to="/login" className="btn btn-primary">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              <UserPlus size={18} /> Register Account
            </Link>
          </div>
        </div>

        <div className="hero__figure" aria-hidden="true">
          <MeterDial />
        </div>
      </div>
    </section>
  )
}

function MeterDial() {
  return (
    <svg viewBox="0 0 320 320" className="meter-dial">
      <circle cx="160" cy="160" r="150" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
      <circle cx="160" cy="160" r="120" fill="none" stroke="var(--primary-tint)" strokeWidth="22" />
      <path
        d="M 160 40 A 120 120 0 1 1 62 218"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="22"
        strokeLinecap="round"
      />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2
        const x1 = 160 + Math.cos(angle) * 98
        const y1 = 160 + Math.sin(angle) * 98
        const x2 = 160 + Math.cos(angle) * 88
        const y2 = 160 + Math.sin(angle) * 88
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink-soft)" strokeWidth="2" opacity="0.35" />
        )
      })}
      <g transform="translate(160 160) rotate(126)">
        <line x1="0" y1="0" x2="0" y2="-78" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" />
      </g>
      <circle cx="160" cy="160" r="9" fill="var(--ink)" />
      <text x="160" y="205" textAnchor="middle" fontFamily="var(--font-display)" fontSize="15" fontWeight="700" fill="var(--ink)">
        0148 m³
      </text>
      <text x="160" y="225" textAnchor="middle" fontFamily="var(--font-body)" fontSize="10.5" fill="var(--ink-soft)">
        Current Reading
      </text>
    </svg>
  )
}