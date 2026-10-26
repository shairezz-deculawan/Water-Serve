import { Link } from 'react-router-dom'
import { UserRound, Hash, MapPin, BadgeCheck, Gauge, Bell, ArrowRight, Droplet } from 'lucide-react'
import { customerProfile, currentBill } from './mockData.js'
import { getAllReports, getReportNotifications } from './reportsStore.js'
import Stepper from './Stepper.jsx'
import './customer.css'

export default function Dashboard() {
  const reports = getAllReports()
  const activeReport = reports.find((r) => r.statusStep < 4) || reports[0]
  const latestNotification = getReportNotifications()[0]

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Welcome back</p>
        <h1 className="page-head__title">{customerProfile.name}</h1>
        <p className="page-head__sub">Here&apos;s what&apos;s happening with your water service.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <UserRound size={18} /> Account overview
          </h2>
          <span className="pill pill-active">
            <BadgeCheck size={13} /> {customerProfile.status}
          </span>
        </div>
        <dl className="kv-list">
          <div className="kv-row">
            <dt><Hash size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />CCWD account number</dt>
            <dd>{customerProfile.accountNumber}</dd>
          </div>
          <div className="kv-row">
            <dt><MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Service address</dt>
            <dd>{customerProfile.serviceAddress}</dd>
          </div>
        </dl>
      </div>

      <div className="grid-2" style={{ marginTop: 20 }}>
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">
              <Gauge size={18} /> Current bill
            </h2>
            <span className="pill pill-unpaid">{currentBill.status}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
            ₱{currentBill.amount.toFixed(2)}
          </p>
          <dl className="kv-list" style={{ marginTop: 16 }}>
            <div className="kv-row">
              <dt>Meter reading</dt>
              <dd>{currentBill.meterReading}</dd>
            </div>
            <div className="kv-row">
              <dt>Due date</dt>
              <dd>{currentBill.dueDate}</dd>
            </div>
          </dl>
          <Link to="/customer/bill" className="btn btn-primary btn-block" style={{ marginTop: 20 }}>
            View full bill <ArrowRight size={16} />
          </Link>
        </div>

        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">
              <Droplet size={18} /> Active incident
            </h2>
            <span className="pill pill-inprogress">{activeReport.type}</span>
          </div>
          <dl className="kv-list">
            <div className="kv-row">
              <dt>Tracking code</dt>
              <dd>{activeReport.trackingCode}</dd>
            </div>
            <div className="kv-row">
              <dt>Submitted</dt>
              <dd>{activeReport.dateSubmitted}</dd>
            </div>
          </dl>
          <Stepper currentStep={activeReport.statusStep} />
          <Link
            to={`/customer/reports/${activeReport.trackingCode}`}
            className="btn btn-outline btn-block"
            style={{ marginTop: 20 }}
          >
            Track this report <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel__head">
          <h2 className="panel__title">
            <Bell size={18} /> Latest notification
          </h2>
          <Link to="/customer/notifications" className="auth__inline-link">
            View all
          </Link>
        </div>
        <p style={{ fontWeight: 600 }}>{latestNotification.title}</p>
        <p style={{ marginTop: 6, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
          {latestNotification.message}
        </p>
        <p style={{ marginTop: 10, fontSize: '0.78rem', color: 'var(--ink-soft)' }}>
          {latestNotification.date}
        </p>
      </div>
    </div>
  )
}