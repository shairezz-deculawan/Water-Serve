import { Receipt } from 'lucide-react'
import { billingRecords } from './adminData.js'
import '../customer/customer.css'
import './admin.css'

function pillClass(status) {
  if (status === 'Paid') return 'pill-paid'
  if (status === 'Overdue') return 'pill-submitted'
  return 'pill-unpaid'
}

export default function Billing() {
  const totalDue = billingRecords
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + b.amount, 0)

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Billing overview</p>
        <h1 className="page-head__title">Billing</h1>
        <p className="page-head__sub">A snapshot of customer billing status for this cycle.</p>
      </div>

      <div className="stat-grid" style={{ marginBottom: 20 }}>
        <div className="stat-card">
          <span className="stat-card__icon">
            <Receipt size={18} />
          </span>
          <p className="stat-card__label">Total outstanding</p>
          <p className="stat-card__value">₱{totalDue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Accounts billed</p>
          <p className="stat-card__value">{billingRecords.length}</p>
        </div>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <Receipt size={18} /> Billing records
          </h2>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Account number</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Due date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {billingRecords.map((b) => (
                <tr key={b.accountNumber}>
                  <td>{b.accountNumber}</td>
                  <td>{b.name}</td>
                  <td>₱{b.amount.toFixed(2)}</td>
                  <td>{b.dueDate}</td>
                  <td>
                    <span className={`pill ${pillClass(b.status)}`}>{b.status}</span>
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