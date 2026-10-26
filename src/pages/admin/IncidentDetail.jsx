import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, User, MapPin, FileText, ImageIcon, UserCog, RefreshCcw, CheckCircle2 } from 'lucide-react'
import { getIncidentsForAdmin, adminStatusLabel, adminStatusPillClass, MAINTENANCE_PERSONNEL } from './adminData.js'
import { assignPersonnel, updateReportStatus } from '../customer/reportsStore.js'
import Stepper from '../customer/Stepper.jsx'
import '../Auth.css'
import '../customer/customer.css'
import './admin.css'

export default function IncidentDetail() {
  const { trackingCode } = useParams()

  const [incident, setIncident] = useState(() =>
    getIncidentsForAdmin().find((r) => r.trackingCode === trackingCode)
  )
  const [selectedPersonnel, setSelectedPersonnel] = useState(MAINTENANCE_PERSONNEL[0])
  const [selectedStatus, setSelectedStatus] = useState(incident ? incident.statusStep : 1)
  const [assignMessage, setAssignMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  if (!incident) {
    return (
      <div>
        <div className="page-head">
          <p className="eyebrow">Incident management</p>
          <h1 className="page-head__title">Incident not found</h1>
        </div>
        <div className="panel">
          <p className="auth__error">No incident found for tracking code &quot;{trackingCode}&quot;.</p>
          <Link to="/admin/incidents" className="btn btn-outline" style={{ marginTop: 16 }}>
            <ArrowLeft size={16} /> Back to incidents
          </Link>
        </div>
      </div>
    )
  }

  const refresh = () => {
    const updated = getIncidentsForAdmin().find((r) => r.trackingCode === trackingCode)
    setIncident(updated)
  }

  const handleAssign = () => {
    assignPersonnel(trackingCode, selectedPersonnel)
    setAssignMessage(`Assigned to ${selectedPersonnel}. Status set to Assigned.`)
    setStatusMessage('')
    setSelectedStatus(2)
    refresh()
  }

  const handleStatusUpdate = () => {
    updateReportStatus(trackingCode, { statusStep: Number(selectedStatus) })
    setStatusMessage(`Status updated to "${adminStatusLabel(Number(selectedStatus))}".`)
    setAssignMessage('')
    refresh()
  }

  return (
    <div>
      <div className="page-head">
        <Link
          to="/admin/incidents"
          className="auth__inline-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft size={14} /> Back to incidents
        </Link>
        <h1 className="page-head__title" style={{ marginTop: 12 }}>
          {incident.type}
        </h1>
        <p className="page-head__sub">Tracking code {incident.trackingCode}</p>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">
              <User size={18} /> Customer details
            </h2>
            <span className={`pill ${adminStatusPillClass(incident.statusStep)}`}>
              {adminStatusLabel(incident.statusStep)}
            </span>
          </div>
          <dl className="kv-list">
            <div className="kv-row">
              <dt>Name</dt>
              <dd>{incident.customerName}</dd>
            </div>
            <div className="kv-row">
              <dt>Account number</dt>
              <dd>{incident.accountNumber}</dd>
            </div>
            <div className="kv-row">
              <dt>
                <MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                Address
              </dt>
              <dd>{incident.address}</dd>
            </div>
            <div className="kv-row">
              <dt>Submitted</dt>
              <dd>{incident.dateSubmitted}</dd>
            </div>
            <div className="kv-row">
              <dt>Assigned personnel</dt>
              <dd>{incident.assignedTo || 'Unassigned'}</dd>
            </div>
          </dl>
        </div>

        <div className="panel">
          <h2 className="panel__title">
            <FileText size={18} /> Description
          </h2>
          <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{incident.description}</p>

          <h2 className="panel__title" style={{ marginTop: 20 }}>
            <ImageIcon size={18} /> Uploaded photo
          </h2>
          {incident.photoDataUrl ? (
            <img
              src={incident.photoDataUrl}
              alt="Reported issue"
              className="report-detail-photo"
              style={{ marginTop: 12 }}
            />
          ) : (
            <p style={{ marginTop: 8, color: 'var(--ink-soft)', fontSize: '0.85rem' }}>No photo attached.</p>
          )}
        </div>
      </div>

      <div className="panel">
        <h2 className="panel__title">Status</h2>
        <Stepper currentStep={incident.statusStep} />
      </div>

      <div className="grid-2">
        <div className="panel">
          <h2 className="panel__title">
            <UserCog size={18} /> Assign maintenance personnel
          </h2>
          <div className="assign-row" style={{ marginTop: 14 }}>
            <label className="assign-field">
              <span>Personnel</span>
              <select value={selectedPersonnel} onChange={(e) => setSelectedPersonnel(e.target.value)}>
                {MAINTENANCE_PERSONNEL.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="btn btn-primary" onClick={handleAssign}>
              Assign Personnel
            </button>
          </div>
          {assignMessage && (
            <p
              style={{
                marginTop: 12,
                color: 'var(--status-ok)',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <CheckCircle2 size={15} /> {assignMessage}
            </p>
          )}
        </div>

        <div className="panel">
          <h2 className="panel__title">
            <RefreshCcw size={18} /> Update status
          </h2>
          <div className="assign-row" style={{ marginTop: 14 }}>
            <label className="assign-field">
              <span>Status</span>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(Number(e.target.value))}>
                <option value={1}>Pending</option>
                <option value={2}>Assigned</option>
                <option value={3}>In Progress</option>
                <option value={4}>Resolved</option>
              </select>
            </label>
            <button type="button" className="btn btn-outline" onClick={handleStatusUpdate}>
              Update Status
            </button>
          </div>
          {statusMessage && (
            <p
              style={{
                marginTop: 12,
                color: 'var(--status-ok)',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <CheckCircle2 size={15} /> {statusMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
} 