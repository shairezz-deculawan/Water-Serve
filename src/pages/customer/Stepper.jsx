import { Check } from 'lucide-react'
import { STATUS_STEPS } from './mockData.js'
import './Stepper.css'

// currentStep is 1-indexed position in STATUS_STEPS (1 = Submitted ... 4 = Resolved)
export default function Stepper({ currentStep }) {
  return (
    <ol className="stepper">
      {STATUS_STEPS.map((step, i) => {
        const stepNumber = i + 1
        const isDone = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep
        return (
          <li
            key={step}
            className={`stepper__item ${isDone ? 'is-done' : ''} ${isCurrent ? 'is-current' : ''}`}
          >
            <span className="stepper__dot">{isDone ? <Check size={13} strokeWidth={3} /> : stepNumber}</span>
            <span className="stepper__label">{step}</span>
          </li>
        )
      })}
    </ol>
  )
}