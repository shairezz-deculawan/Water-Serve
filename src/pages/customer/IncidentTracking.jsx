import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPinned, Search, Check, Circle, ArrowLeft } from 'lucide-react'
import { STATUS_STEPS } from './mockData.js'
import { getAllReports } from './reportsStore.js'
import Stepper from './Stepper.jsx'
import '../Auth.css'
import './customer.css'

export default function IncidentTracking() {
  const { trackingCode } = useParams()
  const navigate = useNavigate()
  const [reports] = useState(() => getAllReports())
  const [query, setQuery] = useState('')
  const [notFound, setNotFound] = useState(false)

  const report = trackingCode
    ? reports.find((r) => r.trackingCode.toLowerCase() === trackingCode.toLowerCase())
    : null

  const handleSearch = (e) => {
    e.preventDefault()
    const match = reports.find((r) => r.trackingCode.toLowerCase() === query.trim().toLowerCase())
    if (match) {
      setNotFound(false)
      navigate(`/customer/reports/${match.trackingCode}`)
    } else {
      setNotFound(true)
    }
  }

  if (!trackingCode || (!report && !notFound)) {
    return (
      <div>
        <div className="page-head">
          <p className="eyebrow">Incident reporting</p>
          <h1 className="page-head__title">Incident Tracking</h1>
          <p className="page-head__sub">Enter a tracking code to see the latest status of a report.</p>
        </div>

        <div className="panel">
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div className="auth__input" style={{ flex: 1, minWidth: 220 }}>
              <Search size={17} />
              <input
                type="text"
                placeholder="e.g. WS-2026-00125"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Track report
            </button>
          </form>
          {trackingCode && !report && (
            <p className="auth__error" style={{ marginTop: 16 }}>
              No report found for tracking code &quot;{trackingCode}&quot;.
            </p>
          )}
        </div>
      </div>
    )
  }

  if (!report) {
    return (
      <div>
        <div className="page-head">
          <p className="eyebrow">Incident reporting</p>
          <h1 className="page-head__title">Incident Tracking</h1>
        </div>
        <div className="panel">
          <p className="auth__error">No report found for tracking code &quot;{trackingCode}&quot;.</p>
          <Link to="/customer/reports" className="btn btn-outline" style={{ marginTop: 16 }}>
            <ArrowLeft size={16} /> Back to my reports
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-head">
        <Link to="/customer/reports" className="auth__inline-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <ArrowLeft size={14} /> Back to my reports
        </Link>
        <h1 className="page-head__title" style={{ marginTop: 12 }}>
          {report.type}
        </h1>
        <p className="page-head__sub">Tracking code {report.trackingCode}</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <MapPinned size={18} /> Status
          </h2>
        </div>
        <Stepper currentStep={report.statusStep} />

        <dl className="kv-list" style={{ marginTop: 24 }}>
          <div className="kv-row">
            <dt>Address</dt>
            <dd>{report.address}</dd>
          </div>
          <div className="kv-row">
            <dt>Submitted</dt>
            <dd>{report.dateSubmitted}</dd>
          </div>
        </dl>

        <p style={{ marginTop: 16, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          {report.description}
        </p>

        {report.photoDataUrl && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', marginBottom: 8 }}>
              Attached photo
            </p>
            <img src={report.photoDataUrl} alt="Reported issue" className="report-detail-photo" />
          </div>
        )}
      </div>

      <div className="panel">
        <h2 className="panel__title">Update timeline</h2>
        <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {STATUS_STEPS.map((step, i) => {
            const update = report.updates.find((u) => u.step === step)
            const reached = i < report.statusStep
            return (
              <li key={step} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: reached ? 'var(--primary)' : 'var(--line)', marginTop: 2 }}>
                  {reached ? <Check size={16} strokeWidth={3} /> : <Circle size={16} />}
                </span>
                <div>
                  <p style={{ fontWeight: 600, color: reached ? 'var(--ink)' : 'var(--ink-soft)' }}>{step}</p>
                  {update ? (
                    <>
                      <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: 2 }}>{update.note}</p>
                      <p style={{ fontSize: '0.76rem', color: 'var(--ink-soft)', marginTop: 2 }}>{update.date}</p>
                    </>
                  ) : (
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', marginTop: 2 }}>Pending</p>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}