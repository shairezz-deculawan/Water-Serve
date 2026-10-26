import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Hash,
  User,
  MapPin,
  FileText,
  ImageIcon,
  PlayCircle,
  CheckCircle2,
  ClipboardCheck,
} from 'lucide-react'
import { customerProfile } from '../customer/mockData.js'
import { getWorkOrder, maintenanceStatusLabel, maintenanceStatusPillClass, startWork, resolveWorkOrder } from './maintenanceData.js'
import Stepper from '../customer/Stepper.jsx'
import '../Auth.css'
import '../customer/customer.css'
import '../admin/admin.css'
import './maintenance.css'

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function WorkOrderDetail() {
  const { trackingCode } = useParams()
  const [order, setOrder] = useState(() => getWorkOrder(trackingCode))

  const [showResolveForm, setShowResolveForm] = useState(false)
  const [repairNotes, setRepairNotes] = useState('')
  const [completionPhoto, setCompletionPhoto] = useState(null)
  const [photoError, setPhotoError] = useState('')
  const [formError, setFormError] = useState('')

  if (!order) {
    return (
      <div>
        <div className="page-head">
          <p className="eyebrow">Field operations</p>
          <h1 className="page-head__title">Work order not found</h1>
        </div>
        <div className="panel">
          <p className="auth__error">
            No work order assigned to you was found for tracking code &quot;{trackingCode}&quot;.
          </p>
          <Link to="/maintenance/orders" className="btn btn-outline" style={{ marginTop: 16 }}>
            <ArrowLeft size={16} /> Back to my work orders
          </Link>
        </div>
      </div>
    )
  }

  const refresh = () => setOrder(getWorkOrder(trackingCode))

  const handleStartWork = () => {
    startWork(trackingCode)
    refresh()
  }

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setPhotoError('Photo must be under 4MB.')
      return
    }

    setPhotoError('')
    const dataUrl = await readFileAsDataUrl(file)
    setCompletionPhoto({ dataUrl })
  }

  const handleResolve = (e) => {
    e.preventDefault()
    if (!repairNotes.trim()) {
      setFormError('Please add repair notes before marking this resolved.')
      return
    }
    setFormError('')
    resolveWorkOrder(trackingCode, {
      repairNotes: repairNotes.trim(),
      completionPhotoDataUrl: completionPhoto?.dataUrl,
    })
    setShowResolveForm(false)
    refresh()
  }

  return (
    <div>
      <div className="page-head">
        <Link
          to="/maintenance/orders"
          className="auth__inline-link"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <ArrowLeft size={14} /> Back to my work orders
        </Link>
        <h1 className="page-head__title" style={{ marginTop: 12 }}>
          {order.type}
        </h1>
        <p className="page-head__sub">
          {order.workOrderId} · Tracking code {order.trackingCode}
        </p>
      </div>

      <div className="grid-2">
        <div className="panel">
          <div className="panel__head">
            <h2 className="panel__title">
              <User size={18} /> Job details
            </h2>
            <span className={`pill ${maintenanceStatusPillClass(order.statusStep)}`}>
              {maintenanceStatusLabel(order.statusStep)}
            </span>
          </div>
          <dl className="kv-list">
            <div className="kv-row">
              <dt>
                <Hash size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                Work Order ID
              </dt>
              <dd>{order.workOrderId}</dd>
            </div>
            <div className="kv-row">
              <dt>Tracking code</dt>
              <dd>{order.trackingCode}</dd>
            </div>
            <div className="kv-row">
              <dt>Customer</dt>
              <dd>{customerProfile.name}</dd>
            </div>
            <div className="kv-row">
              <dt>
                <MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                Address
              </dt>
              <dd>{order.address}</dd>
            </div>
          </dl>
        </div>

        <div className="panel">
          <h2 className="panel__title">
            <FileText size={18} /> Description
          </h2>
          <p style={{ marginTop: 12, color: 'var(--ink-soft)', fontSize: '0.9rem' }}>{order.description}</p>

          <h2 className="panel__title" style={{ marginTop: 20 }}>
            <ImageIcon size={18} /> Customer-uploaded photo
          </h2>
          {order.photoDataUrl ? (
            <img
              src={order.photoDataUrl}
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
        <h2 className="panel__title">Current status</h2>
        <Stepper currentStep={order.statusStep} />

        {order.statusStep === 2 && (
          <button type="button" className="btn btn-primary" style={{ marginTop: 20 }} onClick={handleStartWork}>
            <PlayCircle size={17} /> Start Work
          </button>
        )}

        {order.statusStep === 3 && !showResolveForm && (
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 20 }}
            onClick={() => setShowResolveForm(true)}
          >
            <CheckCircle2 size={17} /> Mark as Resolved
          </button>
        )}

        {order.statusStep === 3 && showResolveForm && (
          <div className="repair-panel">
            <form onSubmit={handleResolve}>
              <label className="form-field form-field--full">
                <span>Repair notes</span>
                <textarea
                  value={repairNotes}
                  onChange={(e) => setRepairNotes(e.target.value)}
                  placeholder="Describe what was done to resolve this issue..."
                  required
                />
              </label>

              <div className="form-field form-field--full" style={{ marginTop: 16 }}>
                <span>Completion photo (optional)</span>

                {completionPhoto ? (
                  <div className="photo-preview" style={{ marginTop: 4 }}>
                    <img src={completionPhoto.dataUrl} alt="Completed repair" />
                  </div>
                ) : (
                  <label className="photo-upload__add" style={{ marginTop: 4 }}>
                    <ImageIcon size={20} />
                    <span>Add photo</span>
                    <input type="file" accept="image/*" onChange={handlePhotoSelect} hidden />
                  </label>
                )}
                {photoError && <p className="auth__error" style={{ marginTop: 8 }}>{photoError}</p>}
              </div>

              {formError && <p className="auth__error" style={{ marginTop: 16 }}>{formError}</p>}

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="submit" className="btn btn-primary">
                  <ClipboardCheck size={17} /> Confirm Resolution
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowResolveForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {order.statusStep === 4 && (
          <div className="repair-panel">
            <p style={{ fontWeight: 600, color: 'var(--status-ok)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 size={17} /> This work order has been resolved.
            </p>
            {order.repairNotes && (
              <>
                <p style={{ marginTop: 12, fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
                  Repair notes
                </p>
                <p style={{ marginTop: 4, fontSize: '0.9rem', color: 'var(--ink)' }}>{order.repairNotes}</p>
              </>
            )}
            {order.completionPhotoDataUrl && (
              <>
                <p style={{ marginTop: 16, fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
                  Completion photo
                </p>
                <img
                  src={order.completionPhotoDataUrl}
                  alt="Completed repair"
                  className="report-detail-photo"
                  style={{ marginTop: 8 }}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}