import { Droplets, MapPin, Phone, Mail } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <div className="footer__brand">
          <span className="footer__logo">
            <Droplets size={18} strokeWidth={2.25} />
          </span>
          <span>
            WaterServe
            <small>Calbayog City Water District</small>
          </span>
        </div>

        <ul className="footer__contact">
          <li>
            <MapPin size={15} /> Brgy. Balud, Calbayog City, Samar
          </li>
          <li>
            <Phone size={15} /> (055) 209-1234
          </li>
          <li>
            <Mail size={15} /> support@ccwd-waterserve.gov.ph
          </li>
        </ul>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} Calbayog City Water District. Student project for academic purposes.</p>
      </div>
    </footer>
  )
}