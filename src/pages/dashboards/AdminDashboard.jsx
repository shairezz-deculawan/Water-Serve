import { Users, FileWarning, Gauge, TrendingUp } from 'lucide-react'
import DashboardLayout from './DashboardLayout.jsx'

export default function AdminDashboard() {
  return (
    <DashboardLayout roleLabel="Administrative Staff" badgeColor="var(--accent)">
      <p className="eyebrow">Admin Dashboard</p>
      <h1 className="dash__title">CCWD overview</h1>
      <p className="dash__sub">This is a prototype dashboard — no live data is connected yet.</p>

      <div className="dash__grid">
        <article className="dash__card">
          <Users size={20} />
          <h3>Registered accounts</h3>
          <p className="dash__stat">12,406</p>
          <p className="dash__meta">+38 this week</p>
        </article>

        <article className="dash__card">
          <FileWarning size={20} />
          <h3>Pending reports</h3>
          <p className="dash__stat">27</p>
          <p className="dash__meta">6 flagged urgent</p>
        </article>

        <article className="dash__card">
          <Gauge size={20} />
          <h3>Readings this cycle</h3>
          <p className="dash__stat">9,912</p>
          <p className="dash__meta">82% of service area</p>
        </article>

        <article className="dash__card">
          <TrendingUp size={20} />
          <h3>Avg. resolution time</h3>
          <p className="dash__stat">1.8 days</p>
          <p className="dash__meta">Down from 2.3 days</p>
        </article>
      </div>
    </DashboardLayout>
  )
}