import { useState } from 'react'
import { UserRound, Mail, Phone, MapPin, Hash, Pencil, Save } from 'lucide-react'
import { customerProfile } from './mockData.js'
import '../Auth.css'
import './customer.css'

export default function Profile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: customerProfile.name,
    email: customerProfile.email,
    contactNumber: customerProfile.contactNumber,
    serviceAddress: customerProfile.serviceAddress,
  })

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Prototype only: changes are kept in local state only, nothing is saved.
    setEditing(false)
  }

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Account</p>
        <h1 className="page-head__title">Profile</h1>
        <p className="page-head__sub">Your CCWD account information.</p>
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
                <span>Full name</span>
                <div className="auth__input">
                  <UserRound size={17} />
                  <input type="text" name="name" value={form.name} onChange={handleChange} />
                </div>
              </label>

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

              <label className="form-field">
                <span>Service address</span>
                <div className="auth__input">
                  <MapPin size={17} />
                  <input type="text" name="serviceAddress" value={form.serviceAddress} onChange={handleChange} />
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
              <dt><Hash size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />CCWD account number</dt>
              <dd>{customerProfile.accountNumber}</dd>
            </div>
            <div className="kv-row">
              <dt><UserRound size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Full name</dt>
              <dd>{form.name}</dd>
            </div>
            <div className="kv-row">
              <dt><Phone size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Contact number</dt>
              <dd>{form.contactNumber}</dd>
            </div>
            <div className="kv-row">
              <dt><Mail size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Email address</dt>
              <dd>{form.email}</dd>
            </div>
            <div className="kv-row">
              <dt><MapPin size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />Service address</dt>
              <dd>{form.serviceAddress}</dd>
            </div>
            <div className="kv-row">
              <dt>Member since</dt>
              <dd>{customerProfile.memberSince}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  )
}