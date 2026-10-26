import { useState } from 'react'
import { UserRound, Mail, Phone, Hash, Wrench, Pencil, Save } from 'lucide-react'
import { MAINTENANCE_STAFF } from './maintenanceData.js'
import '../Auth.css'
import '../customer/customer.css'
import './maintenance.css'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    email: MAINTENANCE_STAFF.email,
    contactNumber: MAINTENANCE_STAFF.contactNumber,
  })

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditing(false)
  }

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Account</p>
        <h1 className="page-head__title">Profile</h1>
        <p className="page-head__sub">Your CCWD maintenance staff information.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <UserRound size={18} /> Personal details
          </h2>
          {!editing && (
            <button type="button" className="btn btn-outline" onClick={() => setEditing(true)}>
              <Pencil size={15} /> Edit
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="form-field">
                <span>Contact number</span>
                <div className="auth__input">
                  <Phone size={17} />
                  <input type="tel" name="contactNumber" value={form.contactNumber} onChange={handleChange} />
                </div>
              </label>

              <label className="form-field">
                <span>Email address</span>
                <div className="auth__input">
                  <Mail size={17} />
                  <input type="email" name="email" value={form.email} onChange={handleChange} />
                </div>
              </label>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button type="submit" className="btn btn-primary">
                <Save size={16} /> Save changes
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <dl className="kv-list">
            <div className="kv-row">
              <dt><Hash size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Employee ID</dt>
              <dd>{MAINTENANCE_STAFF.employeeId}</dd>
            </div>
            <div className="kv-row">
              <dt><UserRound size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Full name</dt>
              <dd>{MAINTENANCE_STAFF.name}</dd>
            </div>
            <div className="kv-row">
              <dt><Wrench size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Role</dt>
              <dd>{MAINTENANCE_STAFF.role}</dd>
            </div>
            <div className="kv-row">
              <dt><Phone size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Contact number</dt>
              <dd>{form.contactNumber}</dd>
            </div>
            <div className="kv-row">
              <dt><Mail size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Email address</dt>
              <dd>{form.email}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  )
}