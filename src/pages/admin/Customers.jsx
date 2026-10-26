import { useMemo, useState } from 'react'
import { Users, Search } from 'lucide-react'
import { customers, TOTAL_CUSTOMERS } from './adminData.js'
import '../Auth.css'
import '../customer/customer.css'
import './admin.css'

export default function Customers() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return customers
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.accountNumber.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Account management</p>
        <h1 className="page-head__title">Customers</h1>
        <p className="page-head__sub">
          {TOTAL_CUSTOMERS.toLocaleString()} registered accounts district-wide. Showing a sample of
          accounts for this prototype.
        </p>
      </div>

      <div className="filter-bar">
        <div className="auth__input" style={{ flex: 1, minWidth: 240 }}>
          <Search size={17} />
          <input
            type="text"
            placeholder="Search by name, account number, or address"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <Users size={18} /> Accounts
          </h2>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Account number</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.accountNumber}>
                  <td>{c.accountNumber}</td>
                  <td>{c.name}</td>
                  <td>{c.address}</td>
                  <td>{c.contactNumber}</td>
                  <td>
                    <span className={`pill ${c.status === 'Active' ? 'pill-active' : 'pill-unpaid'}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}   