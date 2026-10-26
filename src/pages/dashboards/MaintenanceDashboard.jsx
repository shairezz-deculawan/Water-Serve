import { Wrench, MapPin, ClipboardList, CheckCircle2 } from 'lucide-react'
import DashboardLayout from './DashboardLayout.jsx'

export default function MaintenanceDashboard() {
  return (
    <DashboardLayout roleLabel="Maintenance Staff" badgeColor="var(--status-ok)">
      <p className="eyebrow">Maintenance Dashboard</p>
      <h1 className="dash__title">Today&apos;s assignments</h1>
      <p className="dash__sub">This is a prototype dashboard — no live data is connected yet.</p>

      <div className="dash__grid">
        <article className="dash__card">
          <ClipboardList size={20} />
          <h3>Assigned jobs</h3>
          <p className="dash__stat">5</p>
          <p className="dash__meta">2 due before noon</p>
        </article>

        <article className="dash__card">
          <Wrench size={20} />
          <h3>In progress</h3>
          <p className="dash__stat">2</p>
          <p className="dash__meta">Broken pipe — Brgy. Balud</p>
        </article>

        <article className="dash__card">
          <MapPin size={20} />
          <h3>Next stop</h3>
          <p className="dash__stat">WS-24817</p>
          <p className="dash__meta">Low pressure report, 1.2 km away</p>
        </article>

        <article className="dash__card">
          <CheckCircle2 size={20} />
          <h3>Resolved this week</h3>
          <p className="dash__stat">14</p>
          <p className="dash__meta">On track with weekly target</p>
        </article>
      </div>
    </DashboardLayout>
  )
}