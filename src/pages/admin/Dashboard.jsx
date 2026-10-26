import { Link } from 'react-router-dom'
import { Users, Inbox, UserCheck, Wrench, CheckCircle2, Eye } from 'lucide-react'
import { getIncidentsForAdmin, adminStatusLabel, adminStatusPillClass, TOTAL_CUSTOMERS } from './adminData.js'
import '../Auth.css'
import '../customer/customer.css'
import './admin.css'

export default function Dashboard() {
  const incidents = getIncidentsForAdmin()

  const counts = {
    pending: incidents.filter((i) => i.statusStep === 1).length,
    assigned: incidents.filter((i) => i.statusStep === 2).length,
    inProgress: incidents.filter((i) => i.statusStep === 3).length,
    resolved: incidents.filter((i) => i.statusStep === 4).length,
  }

  const recent = incidents.slice(0, 5)

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">CCWD Administrative Staff</p>
        <h1 className="page-head__title">Admin Dashboard</h1>
        <p className="page-head__sub">Overview of customer accounts and reported incidents.</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__icon">
            <Users size={18} />
          </span>
          <p className="stat-card__label">Total Customers</p>
          <p className="stat-card__value">{TOTAL_CUSTOMERS.toLocaleString()}</p>
        </div>

        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: '#FDECEA', color: '#B3261E' }}>
            <Inbox size={18} />
          </span>
          <p className="stat-card__label">Pending Reports</p>
          <p className="stat-card__value">{counts.pending}</p>
        </div>

        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: '#FFF1E1', color: 'var(--accent-dark)' }}>
            <UserCheck size={18} />
          </span>
          <p className="stat-card__label">Assigned Reports</p>
          <p className="stat-card__value">{counts.assigned}</p>
        </div>

        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: '#FFF1E1', color: 'var(--accent-dark)' }}>
            <Wrench size={18} />
          </span>
          <p className="stat-card__label">In Progress</p>
          <p className="stat-card__value">{counts.inProgress}</p>
        </div>

        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: '#E3F3EC', color: 'var(--status-ok)' }}>
            <CheckCircle2 size={18} />
          </span>
          <p className="stat-card__label">Resolved</p>
          <p className="stat-card__value">{counts.resolved}</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel__head">
          <h2 className="panel__title">Recent Incidents</h2>
          <Link to="/admin/incidents" className="auth__inline-link">
            View all
          </Link>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Tracking Code</th>
                <th>Customer</th>
                <th>Issue</th>
                <th>Location</th>
                <th>Status</th>
                <th>Assigned Personnel</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.trackingCode}>
                  <td>{r.trackingCode}</td>
                  <td>{r.customerName}</td>
                  <td>{r.type}</td>
                  <td>{r.address}</td>
                  <td>
                    <span className={`pill ${adminStatusPillClass(r.statusStep)}`}>
                      {adminStatusLabel(r.statusStep)}
                    </span>
                  </td>
                  <td>{r.assignedTo || '—'}</td>
                  <td>
                    <Link to={`/admin/incidents/${r.trackingCode}`} className="auth__inline-link">
                      <Eye size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}