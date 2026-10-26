import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileWarning, MapPin, ImagePlus, X, CheckCircle2, ArrowRight, LayoutDashboard } from 'lucide-react'
import { customerProfile } from './mockData.js'
import { saveReport } from './reportsStore.js'
import '../Auth.css'
import './customer.css'

const ISSUE_TYPES = [
  'Water Leak',
  'Broken Pipe',
  'Low Water Pressure',
  'Dirty/Discolored Water',
  'No Water Supply',
  'Other',
]

const MAX_PHOTO_MB = 4

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function ReportIssue() {
  const [form, setForm] = useState({
    type: ISSUE_TYPES[0],
    description: '',
  })
  const [photo, setPhoto] = useState(null) // { name, dataUrl }
  const [photoError, setPhotoError] = useState('')
  const [submitted, setSubmitted] = useState(null)
  const [photoNotSaved, setPhotoNotSaved] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = '' // allow re-selecting the same file later

    if (!file) return

    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file.')
      return
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      setPhotoError(`Photo must be under ${MAX_PHOTO_MB}MB.`)
      return
    }

    setPhotoError('')
    const dataUrl = await readFileAsDataUrl(file)
    setPhoto({ name: file.name, dataUrl })
  }

  const removePhoto = () => {
    setPhoto(null)
    setPhotoError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description.trim()) return

    // Prototype only: the report is saved to the browser's LocalStorage,
    // not a real backend or CCWD database.
    const { report, photoSaved } = saveReport({
      type: form.type,
      address: customerProfile.serviceAddress,
      description: form.description,
      photoDataUrl: photo?.dataUrl,
    })

    setPhotoNotSaved(Boolean(photo) && !photoSaved)
    setSubmitted(report)
  }

  if (submitted) {
    return (
      <div>
        <div className="page-head">
          <p className="eyebrow">Report an Issue</p>
          <h1 className="page-head__title">Report Submitted Successfully</h1>
        </div>

        <div className="panel" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <span className="confirm-icon">
            <CheckCircle2 size={26} />
          </span>
          <p style={{ color: 'var(--ink-soft)' }}>Your tracking code is</p>
          <p className="confirm-code">{submitted.trackingCode}</p>
          <p style={{ marginTop: 12, color: 'var(--ink-soft)', maxWidth: '48ch', marginInline: 'auto' }}>
            Use this tracking code to monitor your report.
          </p>

          {photoNotSaved && (
            <p className="auth__error" style={{ marginTop: 16, display: 'inline-block' }}>
              Your report was saved, but the photo was too large to store in this prototype.
            </p>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <Link to={`/customer/reports/${submitted.trackingCode}`} className="btn btn-primary">
              Track Report <ArrowRight size={16} />
            </Link>
            <Link to="/customer" className="btn btn-outline">
              <LayoutDashboard size={16} /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Incident reporting</p>
        <h1 className="page-head__title">Report an Issue</h1>
        <p className="page-head__sub">Let CCWD know about a problem with your water service.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <FileWarning size={18} /> Issue details
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              <span>Issue type</span>
              <select name="type" value={form.type} onChange={handleChange}>
                {ISSUE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Location</span>
              <div className="auth__input auth__input--disabled">
                <MapPin size={17} />
                <input type="text" value={customerProfile.serviceAddress} disabled readOnly />
              </div>
            </label>

            <label className="form-field form-field--full">
              <span>Description</span>
              <textarea
                name="description"
                className="textarea-large"
                placeholder="Describe what you're experiencing — when it started, how severe it is, etc."
                value={form.description}
                onChange={handleChange}
                required
              />
            </label>

            <div className="form-field form-field--full">
              <span>Photo (optional)</span>

              {photo ? (
                <div className="photo-preview">
                  <img src={photo.dataUrl} alt="Selected issue" />
                  <button
                    type="button"
                    className="photo-preview__remove"
                    aria-label="Remove photo"
                    onClick={removePhoto}
                  >
                    <X size={13} strokeWidth={3} />
                  </button>
                </div>
              ) : (
                <label className="photo-upload__add">
                  <ImagePlus size={20} />
                  <span>Select a photo</span>
                  <input type="file" accept="image/*" onChange={handlePhotoSelect} hidden />
                </label>
              )}

              <p className="photo-upload__hint">
                Helps CCWD staff assess the issue faster. (Prototype only — stored locally in
                your browser, not uploaded to a real server.)
              </p>
              {photoError && <p className="auth__error">{photoError}</p>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: 20 }}>
            Submit Report
          </button>
        </form>
      </div>
    </div>
  )
}