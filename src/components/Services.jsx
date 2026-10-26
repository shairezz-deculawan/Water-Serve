import { Gauge, AlertTriangle, MapPinned, Check } from 'lucide-react'
import './Services.css'

const SERVICES = [
  {
    icon: Gauge,
    title: 'Water Bill Checker',
    description: 'See exactly what you owe and when, straight from your account.',
    points: [
      'View meter readings',
      'Check bill amount',
      'View due dates',
      'View payment history',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Incident Reporting',
    description: 'Flag a problem with your water supply in a few taps.',
    points: [
      'Report water leaks',
      'Report broken pipes',
      'Report low water pressure',
      'Report dirty/discolored water',
    ],
  },
  {
    icon: MapPinned,
    title: 'Incident Tracking',
    description: 'Stay in the loop from the moment you file a report to its resolution.',
    points: [
      'Receive a tracking code',
      'Track report status',
      'Receive notifications',
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <div className="services__head">
          <p className="eyebrow">What you can do</p>
          <h2 className="services__title">Everything about your water service, in one place</h2>
        </div>

        <div className="services__grid">
          {SERVICES.map(({ icon: Icon, title, description, points }) => (
            <article className="service-card" key={title}>
              <div className="service-card__icon">
                <Icon size={22} strokeWidth={2.1} />
              </div>
              <h3 className="service-card__title">{title}</h3>
              <p className="service-card__desc">{description}</p>
              <ul className="service-card__list">
                {points.map((point) => (
                  <li key={point}>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}