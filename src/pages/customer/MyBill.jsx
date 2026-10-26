import { useState } from 'react'
import { Receipt, Gauge, CalendarClock, CreditCard } from 'lucide-react'
import { currentBill, customerProfile } from './mockData.js'
import './customer.css'

export default function MyBill() {
  const [paid, setPaid] = useState(false)

  const handlePay = () => {
    // Prototype only: no real payment gateway is connected.
    setPaid(true)
  }

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Billing</p>
        <h1 className="page-head__title">My Bill</h1>
        <p className="page-head__sub">Review your latest meter reading and amount due.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <Receipt size={18} /> {currentBill.billingPeriod}
          </h2>
          <span className={`pill ${paid ? 'pill-paid' : 'pill-unpaid'}`}>
            {paid ? 'Paid' : currentBill.status}
          </span>
        </div>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: 700 }}>
          ₱{currentBill.amount.toFixed(2)}
        </p>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.85rem', marginTop: 4 }}>
          Billed to {customerProfile.accountNumber} · {customerProfile.serviceAddress}
        </p>

        <div className="grid-3" style={{ marginTop: 24 }}>
          <div className="panel" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
              <Gauge size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Current reading
            </p>
            <p style={{ marginTop: 6, fontWeight: 700 }}>{currentBill.meterReading}</p>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
              <Gauge size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Previous reading
            </p>
            <p style={{ marginTop: 6, fontWeight: 700 }}>{currentBill.previousReading}</p>
          </div>
          <div className="panel" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink-soft)', fontWeight: 600 }}>
              <CalendarClock size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Due date
            </p>
            <p style={{ marginTop: 6, fontWeight: 700 }}>{currentBill.dueDate}</p>
          </div>
        </div>

        {!paid ? (
          <button type="button" className="btn btn-primary" style={{ marginTop: 24 }} onClick={handlePay}>
            <CreditCard size={17} /> Pay now
          </button>
        ) : (
          <p style={{ marginTop: 24, color: 'var(--status-ok)', fontWeight: 600, fontSize: '0.9rem' }}>
            Payment recorded for this prototype. Thank you!
          </p>
        )}
      </div>

      <div className="panel">
        <h2 className="panel__title">Bill breakdown</h2>
        <div className="table-wrap" style={{ marginTop: 12 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Water consumption (13 m³)</td>
                <td>₱650.00</td>
              </tr>
              <tr>
                <td>Environmental fee</td>
                <td>₱120.00</td>
              </tr>
              <tr>
                <td>Maintenance surcharge</td>
                <td>₱80.00</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>Total</td>
                <td style={{ fontWeight: 700 }}>₱850.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}