import { Link } from 'react-router-dom'
import './ContactSections.css'

function ContactSection({ Icon, SectionHeading }) {
  return (
    <section className="contact-section section-pad" id="contact">
      <div className="section-container">
        <SectionHeading
          eyebrow="TALK WITH MACHMIND360"
          title={<>Let&apos;s make restaurant<br className="desktop-break" /> management simpler.</>}
          copy="Discover how MachMind360 can bring your restaurant&apos;s daily operations together."
          align="left"
        />
        <div className="contact-layout">
          <div className="contact-actions contact-direct-actions">
            <a className="contact-action" href="mailto:machmind360@gmail.com?subject=MachMind360%20Enquiry">
              <span className="contact-action-icon"><Icon name="mail" size={18} /></span>
              <span className="contact-action-copy"><b>Email MachMind360</b><small>machmind360@gmail.com</small></span>
              <Icon name="arrowRight" size={16} />
            </a>
            <a className="contact-action" href="tel:+919845357149">
              <span className="contact-action-icon"><Icon name="phone" size={18} /></span>
              <span className="contact-action-copy"><b>Call MachMind360</b><small>+91 9845357149</small></span>
              <Icon name="arrowRight" size={16} />
            </a>
          </div>
          <aside className="contact-details-card" id="contact-details">
            <span className="contact-details-kicker">GET IN TOUCH</span>
            <h3>Official contact details</h3>
            <div className="contact-placeholder">
              <span>Email</span>
              <b><a href="mailto:machmind360@gmail.com">machmind360@gmail.com</a></b>
            </div>
            <div className="contact-placeholder">
              <span>Phone</span>
              <b><a href="tel:+919845357149">+91 9845357149</a></b>
            </div>
            <p>Reach out to discuss the MachMind360 restaurant POS and business solutions.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function FinalCallToAction({ Icon }) {
  return (
    <section className="final-cta-section" id="final-cta">
      <div className="final-cta-pattern" aria-hidden="true" />
      <div className="final-cta-inner">
        <span className="final-cta-eyebrow"><Icon name="sparkles" size={15} /> THOUGHTFUL TOOLS FOR EVERYDAY SERVICE</span>
        <h2>Your restaurant deserves<br /><em>a smarter way to work.</em></h2>
        <div className="final-cta-actions">
          <Link className="final-cta-primary" to="/contact">Contact Us <Icon name="arrowRight" size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

export { ContactSection, FinalCallToAction }
