import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, ArrowRight, Inbox, ImageIcon } from 'lucide-react'
import { STATUS_STEPS } from './mockData.js'
import { getAllReports } from './reportsStore.js'
import '../Auth.css'
import './customer.css'

function pillClass(step) {
  if (step >= 4) return 'pill-resolved'
  if (step === 3) return 'pill-inprogress'
  if (step === 2) return 'pill-assigned'
  return 'pill-submitted'
}

export default function MyReports() {
  // Read once on mount. Newly submitted reports (saved via ReportIssue) are
  // written to LocalStorage before navigation, so they'll already be there
  // the next time this page mounts.
  const [reports] = useState(() => getAllReports())

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Incident reporting</p>
        <h1 className="page-head__title">My Reports</h1>
        <p className="page-head__sub">Every issue you&apos;ve reported to CCWD, with its current status.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <ClipboardList size={18} /> Reports
          </h2>
        </div>

        {reports.length === 0 ? (
          <div className="empty-state">
            <Inbox size={32} />
            <p>You haven&apos;t submitted any reports yet.</p>
            <Link to="/customer/report" className="btn btn-primary" style={{ marginTop: 16 }}>
              Report an issue
            </Link>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Tracking code</th>
                  <th>Type</th>
                  <th>Submitted</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.photoDataUrl ? (
                        <img src={r.photoDataUrl} alt="" className="report-row-thumb" />
                      ) : (
                        <span className="report-row-thumb report-row-thumb--empty">
                          <ImageIcon size={14} />
                        </span>
                      )}
                    </td>
                    <td>{r.trackingCode}</td>
                    <td>{r.type}</td>
                    <td>{r.dateSubmitted}</td>
                    <td>
                      <span className={`pill ${pillClass(r.statusStep)}`}>
                        {STATUS_STEPS[r.statusStep - 1]}
                      </span>
                    </td>
                    <td>
                      <Link to={`/customer/reports/${r.trackingCode}`} className="auth__inline-link">
                        Track <ArrowRight size={13} style={{ verticalAlign: '-2px' }} />
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