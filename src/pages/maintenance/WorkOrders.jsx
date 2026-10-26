import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, Eye } from 'lucide-react'
import { customerProfile } from '../customer/mockData.js'
import { getMyWorkOrders, maintenanceStatusLabel, maintenanceStatusPillClass } from './maintenanceData.js'
import '../Auth.css'
import '../customer/customer.css'
import '../admin/admin.css'
import './maintenance.css'

const STATUS_FILTERS = ['All', 'Assigned', 'In Progress', 'Resolved']

export default function WorkOrders() {
  const [orders] = useState(() => getMyWorkOrders())
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = useMemo(() => {
    if (statusFilter === 'All') return orders
    return orders.filter((o) => maintenanceStatusLabel(o.statusStep) === statusFilter)
  }, [orders, statusFilter])

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Field operations</p>
        <h1 className="page-head__title">My Work Orders</h1>
        <p className="page-head__sub">Every report currently assigned to you.</p>
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All statuses' : s}
            </option>
          ))}
        </select>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <ClipboardList size={18} /> Work orders
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <ClipboardList size={32} />
            <p>No work orders match this filter.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Work Order ID</th>
                  <th>Tracking Code</th>
                  <th>Issue</th>
                  <th>Customer</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.trackingCode}>
                    <td>{o.workOrderId}</td>
                    <td>{o.trackingCode}</td>
                    <td>{o.type}</td>
                    <td>{customerProfile.name}</td>
                    <td>{o.address}</td>
                    <td>
                      <span className={`pill ${maintenanceStatusPillClass(o.statusStep)}`}>
                        {maintenanceStatusLabel(o.statusStep)}
                      </span>
                    </td>
                    <td>
                      <Link to={`/maintenance/orders/${o.trackingCode}`} className="auth__inline-link">
                        <Eye size={13} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                        View Job
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}