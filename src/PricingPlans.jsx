import { useState } from 'react'
import './PricingPlans.css'

const plans = [
  {
    name: 'Basic',
    prices: { monthly: '349', yearly: '3,990' },
    summary: 'The essentials for counter billing and daily visibility.',
    features: [
      'Billing on any phone',
      'GST bills',
      'UPI QR',
      'Printing',
      'Offline billing',
      'Cash',
      'Dues',
      'Profit',
      'Phone alerts',
      'Reports',
    ],
  },
  {
    name: 'Plus',
    prices: { monthly: '649', yearly: '7,990' },
    summary: 'Everything in Basic, plus tools to coordinate the team.',
    features: [
      'Tables',
      'KOT',
      'Move KOT',
      'Waiter and chef logins',
      'Stock and recipes',
      'Six languages',
      'Practice mode',
      'WhatsApp bills with tap-to-send',
    ],
    featured: true,
  },
  {
    name: 'Pro',
    prices: { monthly: '849', yearly: '9,990' },
    summary: 'Everything in Plus, plus advanced stock and vendor workflows.',
    features: [
      'Smart stock and recipe learning',
      'Vendor orders',
      'Automatic WhatsApp',
      '1,000 credits per month',
    ],
  },
]

const addOns = [
  { name: 'MACH AI Assistant', price: 'Starting at ₹49/month', description: 'Conversational restaurant insights and business assistance.' },
  { name: 'WhatsApp', price: 'From ₹59/month', description: 'Plan-specific options; Plus and Pro inclusions are listed above.' },
  { name: 'Customer Loyalty', price: '₹49/month', description: 'Customer points and retention capabilities for your restaurant.' },
  { name: 'Top-ups', price: 'From ₹149', description: 'Additional usage and feature top-up options.' },
]

function PricingPlans({ Icon, SectionHeading }) {
  const [billingPeriod, setBillingPeriod] = useState('monthly')

  return (
    <section className="pricing-section section-pad" id="pricing">
      <div className="section-container">
        <SectionHeading
          eyebrow="PLANS & PRICING"
          title={<>Simple plans.<br /><em>Everything your restaurant needs.</em></>}
          copy="Choose the plan level that fits your service."
        />

        <div className="pricing-controls">
          <div className="pricing-period-toggle" role="group" aria-label="Choose displayed billing period">
            <button type="button" className={billingPeriod === 'monthly' ? 'pricing-period-active' : ''} onClick={() => setBillingPeriod('monthly')} aria-pressed={billingPeriod === 'monthly'}>Monthly</button>
            <button type="button" className={billingPeriod === 'yearly' ? 'pricing-period-active' : ''} onClick={() => setBillingPeriod('yearly')} aria-pressed={billingPeriod === 'yearly'}>Yearly</button>
          </div>
          <span className="pricing-currency">All prices in INR</span>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={`pricing-card${plan.featured ? ' pricing-card-featured' : ''}`} key={plan.name}>
              {plan.featured && <span className="pricing-featured-badge">PLUS PLAN</span>}
              <div className="pricing-card-heading">
                <span className="pricing-plan-label">MACHMIND360 · {plan.name.toUpperCase()}</span>
                <span className="pricing-plan-mark"><Icon name={plan.featured ? 'sparkles' : 'check'} size={18} /></span>
              </div>
              <h3>{plan.name}</h3>
              <p className="pricing-summary">{plan.summary}</p>
              <div className="pricing-amount" aria-live="polite">
                <span className="pricing-rupee">₹</span>
                <strong>{plan.prices[billingPeriod]}</strong>
                <span className="pricing-period">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
              </div>
              <p className="pricing-feature-intro">{plan.featured || plan.name === 'Pro' ? (plan.name === 'Plus' ? 'Everything in Basic, plus:' : 'Everything in Plus, plus:') : 'Included features:'}</p>
              <ul className="pricing-feature-list">
                {plan.features.map((feature) => <li key={feature}><Icon name="check" size={14} />{feature}</li>)}
              </ul>
              <a className={plan.featured ? 'pricing-card-cta pricing-card-cta-featured' : 'pricing-card-cta'} href="mailto:machmind360@gmail.com?subject=MachMind360%20Plan%20Enquiry">
                Discuss this plan <Icon name="arrowRight" size={15} />
              </a>
            </article>
          ))}
        </div>

        <section className="pricing-addons" aria-labelledby="pricing-addons-title">
          <div className="pricing-addons-heading">
            <span className="pricing-kicker">AVAILABLE SEPARATELY</span>
            <h3 id="pricing-addons-title">Add-ons for the way you work.</h3>
            <p>These are separate from the plan prices. WhatsApp features included in Plus and Pro are described on their cards.</p>
          </div>
          <div className="pricing-addon-grid">
            {addOns.map((addOn) => (
              <article className="pricing-addon-card" key={addOn.name}>
                <span className="pricing-addon-icon"><Icon name={addOn.name === 'MACH AI Assistant' ? 'sparkles' : addOn.name === 'Customer Loyalty' ? 'plus' : 'orders'} size={17} /></span>
                <div><h4>{addOn.name}</h4><strong>{addOn.price}</strong><p>{addOn.description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <p className="pricing-disclaimer">Please contact MachMind360 to confirm current availability and terms.</p>
      </div>
    </section>
  )
}

export default PricingPlans
