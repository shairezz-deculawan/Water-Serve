import { Search, FileWarning, MapPin, CircleCheck } from 'lucide-react'
import './HowItWorks.css'

const STEPS = [
  {
    icon: Search,
    label: 'Check',
    text: 'Review your meter reading and current bill.',
  },
  {
    icon: FileWarning,
    label: 'Report',
    text: 'Log a supply problem in a short form.',
  },
  {
    icon: MapPin,
    label: 'Track',
    text: 'Follow your report with a tracking code.',
  },
  {
    icon: CircleCheck,
    label: 'Resolve',
    text: 'Get notified once CCWD resolves it.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="how__title">From reading to resolution, in four steps</h2>

        <ol className="how__steps">
          {STEPS.map(({ icon: Icon, label, text }, i) => (
            <li className="how__step" key={label}>
              <div className="how__step-top">
                <span className="how__number">{String(i + 1).padStart(2, '0')}</span>
                <span className="how__icon">
                  <Icon size={20} strokeWidth={2.1} />
                </span>
              </div>
              <h3 className="how__label">{label}</h3>
              <p className="how__text">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}