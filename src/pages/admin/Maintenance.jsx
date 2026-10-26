import { Wrench, ClipboardList } from 'lucide-react'
import { getIncidentsForAdmin, adminStatusLabel, adminStatusPillClass, MAINTENANCE_PERSONNEL } from './adminData.js'
import '../Auth.css'
import '../customer/customer.css'
import './admin.css'

export default function Maintenance() {
  const incidents = getIncidentsForAdmin()

  const workload = MAINTENANCE_PERSONNEL.map((name) => {
    const assigned = incidents.filter((i) => i.assignedTo === name)
    return {
      name,
      active: assigned.filter((i) => i.statusStep < 4).length,
      resolved: assigned.filter((i) => i.statusStep === 4).length,
      jobs: assigned,
    }
  })

  const unassigned = incidents.filter((i) => !i.assignedTo)

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Field operations</p>
        <h1 className="page-head__title">Maintenance</h1>
        <p className="page-head__sub">Workload overview for CCWD maintenance personnel.</p>
      </div>

      <div className="grid-3">
        {workload.map((w) => (
          <div className="panel" key={w.name}>
            <div className="panel__head">
              <h2 className="panel__title">
                <Wrench size={18} /> {w.name}
              </h2>
            </div>
            <dl className="kv-list">
              <div className="kv-row">
                <dt>Active jobs</dt>
                <dd>{w.active}</dd>
              </div>
              <div className="kv-row">
                <dt>Resolved</dt>
                <dd>{w.resolved}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <div className="panel__head">
          <h2 className="panel__title">
            <ClipboardList size={18} /> Unassigned reports
          </h2>
        </div>
        {unassigned.length === 0 ? (
          <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
            Every current report has been assigned to a personnel.
          </p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tracking Code</th>
                  <th>Customer</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {unassigned.map((i) => (
                  <tr key={i.trackingCode}>
                    <td>{i.trackingCode}</td>
                    <td>{i.customerName}</td>
                    <td>{i.type}</td>
                    <td>
                      <span className={`pill ${adminStatusPillClass(i.statusStep)}`}>
                        {adminStatusLabel(i.statusStep)}
                      </span>
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