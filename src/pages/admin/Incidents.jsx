import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Eye, FileWarning } from 'lucide-react'
import { getIncidentsForAdmin, adminStatusLabel, adminStatusPillClass } from './adminData.js'
import '../Auth.css'
import '../customer/customer.css'
import './admin.css'

const STATUS_FILTERS = ['All', 'Pending', 'Assigned', 'In Progress', 'Resolved']

export default function Incidents() {
  const [incidents] = useState(() => getIncidentsForAdmin())
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return incidents.filter((r) => {
      const matchesStatus = statusFilter === 'All' || adminStatusLabel(r.statusStep) === statusFilter
      const matchesQuery =
        !q ||
        r.trackingCode.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [incidents, query, statusFilter])

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Incident management</p>
        <h1 className="page-head__title">Incidents</h1>
        <p className="page-head__sub">Search, filter, and manage all reported incidents.</p>
      </div>

      <div className="filter-bar">
        <div className="auth__input" style={{ flex: 1, minWidth: 240 }}>
          <Search size={17} />
          <input
            type="text"
            placeholder="Search by tracking code, customer, issue, or address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === 'All' ? 'All statuses' : s}
            </option>
          ))}
        </select>
      </div>

      <div className="panel">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <FileWarning size={32} />
            <p>No incidents match your search.</p>
          </div>
        ) : (
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
                {filtered.map((r) => (
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
        )}
      </div>
    </div>
  )
}