import { useState } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { getMyWorkOrders, maintenanceStatusLabel } from './maintenanceData.js'
import '../Auth.css'
import '../customer/customer.css'
import './maintenance.css'

function buildNotifications(orders) {
  return orders.map((o) => {
    let title
    let message
    if (o.statusStep === 2) {
      title = `New work order assigned: ${o.workOrderId}`
      message = `You've been assigned a ${o.type} report at ${o.address}.`
    } else if (o.statusStep === 3) {
      title = `${o.workOrderId} is in progress`
      message = `Reminder: ${o.type} at ${o.address} is still in progress.`
    } else {
      title = `${o.workOrderId} marked resolved`
      message = `You resolved the ${o.type} report at ${o.address}.`
    }
    const latestUpdate = o.updates?.[o.updates.length - 1]
    return {
      id: o.trackingCode,
      title,
      message,
      date: latestUpdate?.date || o.dateSubmitted,
      read: o.statusStep === 4,
      order: o,
    }
  }).sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1))
}

export default function Notifications() {
  const [items, setItems] = useState(() => buildNotifications(getMyWorkOrders()))

  const markRead = (id) => {
    setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllRead = () => {
    setItems((list) => list.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = items.filter((n) => !n.read).length

  return (
    <div>
      <div className="page-head">
        <p className="eyebrow">Stay updated</p>
        <h1 className="page-head__title">Notifications</h1>
        <p className="page-head__sub">Updates about your work order assignments.</p>
      </div>

      <div className="panel">
        <div className="panel__head">
          <h2 className="panel__title">
            <Bell size={18} /> {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
          </h2>
          {unreadCount > 0 && (
            <button
              type="button"
              className="auth__inline-link"
              onClick={markAllRead}
              style={{ background: 'none', border: 'none' }}
            >
              Mark all as read
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty-state">
            <BellOff size={32} />
            <p>No notifications yet.</p>
          </div>
        ) : (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {items.map((n) => (
              <li
                key={n.id}
                onClick={() => markRead(n.id)}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '16px 4px',
                  borderBottom: '1px solid var(--line)',
                  cursor: 'pointer',
                  background: n.read ? 'transparent' : 'var(--primary-tint)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: n.read ? 'transparent' : 'var(--accent)',
                    marginTop: 6,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <p style={{ fontWeight: 600 }}>{n.title}</p>
                  <p style={{ marginTop: 4, fontSize: '0.88rem', color: 'var(--ink-soft)' }}>{n.message}</p>
                  <p style={{ marginTop: 6, fontSize: '0.76rem', color: 'var(--ink-soft)' }}>
                    {n.date} · {maintenanceStatusLabel(n.order.statusStep)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}