import { History, Receipt } from 'lucide-react'
import { paymentHistory } from './mockData.js'
import './customer.css'

export default function PaymentHistory() {
  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Billing</p>
        <h1 className="page-head__title">Payment History</h1>
        <p className="page-head__sub">A record of your past payments to CCWD.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <History size={18} /> Recent payments
          </h2>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="empty-state">
            <Receipt size={32} />
            <p>No payments recorded yet.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reference No.</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.date}</td>
                    <td>₱{p.amount.toFixed(2)}</td>
                    <td>{p.method}</td>
                    <td>
                      <span className="pill pill-paid">{p.status}</span>
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