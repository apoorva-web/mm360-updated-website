import './WhyMachMind.css'

const differentiators = [
  {
    number: '01',
    icon: 'boxes',
    title: 'One connected platform',
    problem: 'When billing, tables, kitchen and stock live in separate tools, staff have to repeat work and piece the day together.',
    benefit: 'Bring billing, tables, kitchen, stock, expenses and reports into one restaurant workflow.',
    visual: ['Billing', 'Tables', 'Kitchen', 'Stock', 'Reports'],
    href: '#feature-dashboard',
    note: 'One product story · capabilities shown across the feature showcase',
    featured: true,
  },
  {
    number: '02',
    icon: 'table',
    title: 'Works across devices',
    problem: 'A counter-only view can leave owners and staff without the right screen for their role.',
    benefit: 'Access the platform on Android, iPhone, Windows and Mac through a phone, tablet or computer using the app or browser.',
    visual: ['Phone', 'Tablet', 'Computer', 'App + browser'],
    href: '#feature-platform-access',
    note: 'Cross-device access with live sync',
  },
  {
    number: '03',
    icon: 'clock',
    title: 'Offline billing',
    problem: 'An internet interruption can disrupt counter service.',
    benefit: 'The presented workflow keeps counter billing available offline and uploads bills when connectivity returns.',
    visual: ['Counter billing', 'Offline', 'Sync on return'],
    href: '#feature-platform-access',
    note: 'Offline sync is not connected in the website demo',
  },
  {
    number: '04',
    icon: 'orders',
    title: 'Connected kitchen',
    problem: 'Unclear changes, cancellations or moved dishes can cause kitchen confusion.',
    benefit: 'KOTs and the simulated kitchen display distinguish new tickets, changes, cancellations and moved items.',
    visual: ['New KOT', 'ORDER CHANGED', 'CANCEL', 'MOVED'],
    href: '#feature-kot',
    note: 'Local KOT preview · no physical printer or kitchen display connection',
  },
  {
    number: '05',
    icon: 'boxes',
    title: 'Smart stock management',
    problem: 'Without recipe and usage context, shortages or unusual ingredient use can be hard to spot.',
    benefit: 'Link dishes to recipes for stock deductions and alerts. Pro stock learning compares actual portions and suggests changes for approval.',
    visual: ['Recipe use', 'Stock deduction', 'Low-stock alert', 'Pro · usage learning'],
    href: '#feature-smart-stock',
    note: 'Recipe deductions are locally simulated; Pro learning supports smarter stock recommendations',
  },
  {
    number: '06',
    icon: 'sparkles',
    title: 'AI restaurant assistant',
    problem: 'Finding patterns across sales, stock and menu details can take time.',
    benefit: 'The paid add-on is presented for business questions, evening notes, shopping lists, menu extraction, recipe drafts and multilingual dish names.',
    visual: ['Ask', 'Evening note', 'Shopping list', 'Menu + recipes'],
    href: '#feature-ai',
    note: 'Paid add-on · Starting at ₹49/month · website replies are samples',
    featured: true,
  },
  {
    number: '07',
    icon: 'check',
    title: 'Multilingual staff experience',
    problem: 'Language differences can make menu names and daily training harder to follow.',
    benefit: 'Support English, Hindi, Kannada, Marathi, Konkani and Bengali, including language-specific dish names.',
    visual: ['English', 'Hindi', 'Kannada', 'Marathi', 'Konkani', 'Bengali'],
    href: '#feature-staff',
    note: 'Multilingual menus and staff experience',
  },
  {
    number: '08',
    icon: 'receipt',
    title: 'WhatsApp integration',
    problem: 'Manually relaying bills and purchase requests adds extra steps.',
    benefit: 'Plus includes tap-to-send customer bill links; Pro adds automatic bills and vendor orders.',
    visual: ['Plus · customer bill link', 'Pro · bills + vendor orders'],
    href: '#feature-whatsapp',
    note: 'Plan-gated capability · no WhatsApp messages are sent by this website',
  },
  {
    number: '09',
    icon: 'plus',
    title: 'Customer loyalty',
    problem: 'It can be difficult to recognise regulars or bring inactive customers back.',
    benefit: 'The loyalty add-on is presented with customer lookup, points, bill redemption and regular/new/inactive insights.',
    visual: ['Earn points', 'Redeem', 'Identify', 'Win back'],
    href: '#feature-loyalty',
    note: 'Paid add-on · not connected in the website demo',
  },
  {
    number: '10',
    icon: 'chart',
    title: 'Business reports',
    problem: 'Important sales and tax information can be scattered across records.',
    benefit: 'Access 28 reports with Excel and PDF exports, including sales, GST, dues and order types.',
    visual: ['28 reports', 'Excel', 'PDF', 'Sales · GST · dues'],
    href: '#feature-reports',
    note: 'Live restaurant data and report exports are not connected here',
  },
  {
    number: '11',
    icon: 'chart',
    title: 'Owner visibility',
    problem: 'Owners need a clearer view than sales alone to understand the day.',
    benefit: 'See sales, expenses, cash, profit and relevant alerts together; profit access is described as owner-only.',
    visual: ['Sales', 'Expenses', 'Cash', 'Profit · owner-only', 'Alerts'],
    href: '#feature-dashboard',
    note: 'Website figures are samples · profit and expense summaries are illustrative',
  },
  {
    number: '12',
    icon: 'check',
    title: 'Data management',
    problem: 'Shared access and unclear retention make business records harder to protect and retrieve.',
    benefit: 'Use separate restaurant databases with access restrictions, nightly backups, 14-day backup history and ten-year bill retention.',
    visual: ['Separate databases', 'Nightly backup', '14 days', 'Bills · 10 years'],
    href: '#feature-security',
    note: 'Data controls and retention capabilities',
    featured: true,
  },
]

function WhyMachMind({ Icon, SectionHeading }) {
  return (
    <section className="why-section section-pad" id="why-machmind360">
      <div className="why-pattern" aria-hidden="true" />
      <div className="section-container why-container">
        <SectionHeading
          eyebrow="WHY MACHMIND360"
          title={<>More than billing software.<br /><em>A smarter way to run your restaurant.</em></>}
          copy="Bring your counter, kitchen, stock and business insights together in one connected platform."
          light
        />

        <div className="why-grid">
          {differentiators.map((item) => (
            <article className={`why-card${item.featured ? ' why-card-featured' : ''}`} key={item.number}>
              <div className="why-card-heading">
                <span className="why-card-icon"><Icon name={item.icon} size={19} /></span>
                <span className="why-card-number">{item.number} / 12</span>
              </div>
              <h3>{item.title}</h3>
              <div className="why-card-copy">
                <p><b>The friction</b>{item.problem}</p>
                <p><b>The difference</b>{item.benefit}</p>
              </div>
              <div className="why-visual" aria-label={`${item.title} highlights`}>
                {item.visual.map((label) => <span key={label}>{label}</span>)}
              </div>
              <p className="why-card-note">{item.note}</p>
            </article>
          ))}
        </div>

        <p className="why-scope-note">Website examples use sample data. Offline sync, messaging, AI services, hardware and live restaurant records are not connected.</p>


      </div>
    </section>
  )
}

export default WhyMachMind
