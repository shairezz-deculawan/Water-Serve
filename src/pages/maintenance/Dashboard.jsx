import { Link } from 'react-router-dom'
import { ClipboardList, Wrench, CheckCircle2, MapPin, ArrowRight, Inbox } from 'lucide-react'
import { customerProfile } from '../customer/mockData.js'
import { getMyWorkOrders, maintenanceStatusLabel, maintenanceStatusPillClass, MAINTENANCE_STAFF } from './maintenanceData.js'
import '../Auth.css'
import '../customer/customer.css'
import '../admin/admin.css'
import './maintenance.css'

export default function Dashboard() {
  const orders = getMyWorkOrders()

  const counts = {
    assigned: orders.filter((o) => o.statusStep === 2).length,
    inProgress: orders.filter((o) => o.statusStep === 3).length,
    completed: orders.filter((o) => o.statusStep === 4).length,
  }

  const activeOrders = orders.filter((o) => o.statusStep === 2 || o.statusStep === 3)

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Welcome back</p>
        <h1 className="page-head__title">{MAINTENANCE_STAFF.name}</h1>
        <p className="page-head__sub">{MAINTENANCE_STAFF.role} · CCWD Maintenance Staff</p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card__icon" style={{ background: '#FFF1E1', color: 'var(--accent-dark)' }}>
            <ClipboardList size={18} />
          </span>
          <p className="stat-card__label">Assigned Work Orders</p>
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
          <p className="stat-card__label">Completed</p>
          <p className="stat-card__value">{counts.completed}</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel__head">
          <h2 className="panel__title">Active Work Orders</h2>
          <Link to="/maintenance/orders" className="auth__inline-link">
            View all
          </Link>
        </div>

        {activeOrders.length === 0 ? (
          <div className="empty-state">
            <Inbox size={32} />
            <p>No active work orders right now.</p>
          </div>
        ) : (
          <div className="wo-grid">
            {activeOrders.map((o) => (
              <div className="wo-card" key={o.trackingCode}>
                <div className="wo-card__head">
                  <div>
                    <p className="wo-card__id">{o.workOrderId}</p>
                    <p className="wo-card__type">{o.type}</p>
                  </div>
                  <span className={`pill ${maintenanceStatusPillClass(o.statusStep)}`}>
                    {maintenanceStatusLabel(o.statusStep)}
                  </span>
                </div>

                <dl className="kv-list" style={{ marginTop: 16 }}>
                  <div className="kv-row">
                    <dt>Customer</dt>
                    <dd>{customerProfile.name}</dd>
                  </div>
                  <div className="kv-row">
                    <dt>
                      <MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                      Location
                    </dt>
                    <dd>{o.address}</dd>
                  </div>
                </dl>

                <Link
                  to={`/maintenance/orders/${o.trackingCode}`}
                  className="btn btn-primary btn-block"
                  style={{ marginTop: 16 }}
                >
                  View Job <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}