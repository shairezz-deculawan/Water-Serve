import { Building2 } from 'lucide-react'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__row">
        <div className="about__mark">
          <Building2 size={22} strokeWidth={2} />
        </div>
        <div>
          <p className="eyebrow">About WaterServe</p>
          <h2 className="about__title">
            Built for Calbayog City Water District and the households it serves
          </h2>
          <p className="about__text">
            WaterServe is the official online portal of the Calbayog City
            Water District (CCWD), created to bring meter reading inquiries
            and incident reporting online. Instead of a trip to the district
            office, concessionaires can check their bill, report a supply
            problem, and track its status from any device — helping CCWD
            respond to service interruptions faster and keep residents
            informed every step of the way.
          </p>
        </div>
      </div>
    </section>
  )
}