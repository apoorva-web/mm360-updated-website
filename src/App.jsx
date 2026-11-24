import { useEffect, useState } from 'react'
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import AIAssistantShowcase from './AIAssistantShowcase.jsx'
import PricingPlans from './PricingPlans.jsx'
import WhyMachMind from './WhyMachMind.jsx'
import { ContactSection } from './ContactSections.jsx'
import PosDemo from './PosDemo.jsx'
import BackButton from './BackButton.jsx'
import './Readability.css'

const menuItems = [
  { id: 1, name: 'The Santosa Special Biryani', category: 'Biryani', price: 220, note: 'Signature · serves 1' },
  { id: 2, name: 'Chicken Dum Biryani', category: 'Biryani', price: 180, note: 'Slow-cooked · serves 1' },
  { id: 3, name: 'Veg Biryani', category: 'Biryani', price: 140, note: 'Garden fresh · serves 1' },
  { id: 4, name: 'Chicken Kabab', category: 'Sides', price: 160, note: 'House marinade · 4 pcs' },
  { id: 5, name: 'Paneer Tikka', category: 'Sides', price: 150, note: 'Chargrilled · 6 pcs' },
  { id: 6, name: 'Masala Buttermilk', category: 'Drinks', price: 35, note: 'Chilled · 250 ml' },
]

const categories = ['All items', 'Biryani', 'Sides', 'Drinks']

function Icon({ name, size = 20 }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 1.7,
  }

  const drawings = {
    sparkles: <><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    arrow: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
    arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    receipt: <><path d="M5 3.5h14v18l-3-2-4 2-4-2-3 2v-18Z" /><path d="M8.5 8h7M8.5 12h7M8.5 16h3.5" /></>,
    boxes: <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5v9l8 4.5 8-4.5v-9M12 12v9" /><path d="m8 5.2 8 4.6" /></>,
    table: <><path d="M4 6h16M6 6v5h12V6M7 11v9m10-9v9M4 20h16" /><path d="M9 8.5h.01M15 8.5h.01" /></>,
    orders: <><path d="M7 4h13v17H7zM4 7H3v14h13v-1" /><path d="M10 9h7M10 13h7M10 17h4" /><path d="m10 5 1.5-2h3L16 5" /></>,
    chart: <><path d="M4 19V5m0 14h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    minus: <><path d="M5 12h14" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    phone: <><path d="M7 3h3l2 5-2 2a15 15 0 0 0 4 4l2-2 5 2v3c0 1.1-.9 2-2 2C10 19 5 14 5 5c0-1.1.9-2 2-2Z" /></>,
  }

  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" {...common}>
      {drawings[name] || drawings.sparkles}
    </svg>
  )
}

function Brand({ light = false }) {
  return (
    <Link className={`brand${light ? ' brand-light' : ''}`} to="/" aria-label="MachMind360 home">
      <img className="brand-logo" src="/favicon.svg" alt="MachMind360" />
    </Link>
  )
}

function SectionHeading({ eyebrow, title, copy, light = false, align = 'center' }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''} align-${align}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function HeroDashboard() {
  return (
    <div className="dashboard-wrap" aria-label="Illustration of the MachMind360 restaurant POS dashboard">
      <div className="dashboard-glow" />
      <div className="dashboard-window">
        <div className="dashboard-topbar">
          <div className="window-dots"><i /><i /><i /></div>
          <span className="dashboard-brand">MachMind<span>360</span></span>
          <span className="dashboard-live"><i /> SAMPLE DASHBOARD</span>
        </div>
        <div className="dashboard-body">
          <aside className="dashboard-sidebar">
            <span className="side-icon side-active"><Icon name="chart" size={17} /></span>
            <span className="side-icon"><Icon name="receipt" size={17} /></span>
            <span className="side-icon"><Icon name="table" size={17} /></span>
            <span className="side-icon"><Icon name="boxes" size={17} /></span>
          </aside>
          <div className="dashboard-main">
            <div className="dash-title-row">
              <div><small>SAMPLE SERVICE OVERVIEW</small><h3>Good afternoon, team</h3></div>
              <span className="dash-user">AK</span>
            </div>
            <div className="dash-metrics">
              <div className="dash-metric"><small>Today&apos;s sales</small><strong>₹24,680</strong><span>↑ 12.8% <i>vs. last week</i></span></div>
              <div className="dash-metric"><small>Orders served</small><strong>86</strong><span className="metric-neutral">+ 8 <i>since yesterday</i></span></div>
              <div className="dash-metric"><small>Avg. order value</small><strong>₹287</strong><span className="metric-neutral">On track <i>this week</i></span></div>
            </div>
            <div className="dash-bottom">
              <div className="sales-panel">
                <div className="panel-title"><strong>Sales overview</strong><span>This week⌄</span></div>
                <div className="chart-area">
                  <div className="chart-y"><i>₹8k</i><i>₹4k</i><i>₹0</i></div>
                  <div className="chart-bars">{[38, 57, 48, 76, 61, 91, 69].map((height, index) => <span className={index === 5 ? 'bar bar-highlight' : 'bar'} style={{ height: `${height}%` }} key={index} />)}</div>
                </div>
                <div className="chart-days"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
              </div>
              <div className="orders-panel">
                <div className="panel-title"><strong>Recent orders</strong><span>See all</span></div>
                <div className="order-line"><span className="order-id">#1048</span><span>Chicken Dum Biryani</span><b>₹180</b></div>
                <div className="order-line"><span className="order-id">#1047</span><span>The Santosa Special Biryani</span><b>₹220</b></div>
                <div className="order-line"><span className="order-id">#1046</span><span>Veg Biryani</span><b>₹140</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-note note-orders"><span className="note-icon"><Icon name="receipt" size={18} /></span><span><b>Order received</b><small>Table 04 · just now</small></span><i className="note-check"><Icon name="check" size={13} /></i></div>
      <div className="float-note note-stock"><span className="stock-ring">✓</span><span><b>Service, in sync</b><small>Everything in its place</small></span></div>
    </div>
  )
}

function RestaurantDemo() {
  const [category, setCategory] = useState('All items')
  const [cart, setCart] = useState({})
  const [notice, setNotice] = useState('')
  const [activeTab, setActiveTab] = useState('New order')

  const visibleItems = menuItems.filter((item) => category === 'All items' || item.category === category)
  const cartItems = menuItems.filter((item) => cart[item.id])
  const itemCount = Object.values(cart).reduce((total, count) => total + count, 0)
  const subtotal = cartItems.reduce((total, item) => total + item.price * cart[item.id], 0)
  const updateCart = (id, change) => {
    setNotice('')
    setCart((current) => {
      const nextCount = (current[id] || 0) + change
      const next = { ...current }
      if (nextCount <= 0) delete next[id]
      else next[id] = nextCount
      return next
    })
  }

  const placeOrder = () => {
    if (!itemCount) {
      setNotice('Add an item to start an order.')
      return
    }
    setCart({})
    setNotice('Demo order complete — no real order was sent.')
  }

  const tables = ['01', '02', '03', '04', '05', '06']

  return (
    <div className="pos-demo" aria-label="Interactive restaurant POS demo">
      <div className="pos-topbar">
        <div className="pos-logo"><div><b>MachMind<span>360</span></b><small>RESTAURANT POS</small></div></div>
        <div className="pos-location"><Icon name="pin" size={15} /> <span className="restaurant-wordmark">The Santosa, Anmod</span> <span className="location-chevron">⌄</span></div>
        <div className="pos-status"><i /> Demo mode <span className="pos-avatar">AK</span></div>
      </div>
      <div className="pos-tabs" role="tablist" aria-label="POS screens">
        {['New order', 'Tables'].map((tab) => (
          <button className={`pos-tab${activeTab === tab ? ' pos-tab-active' : ''}`} key={tab} onClick={() => { setActiveTab(tab); setNotice('') }} role="tab" aria-selected={activeTab === tab}>{tab}</button>
        ))}
        <span className="pos-time">SERVICE PREVIEW <i /> OPEN</span>
      </div>
      {activeTab === 'New order' ? (
        <div className="pos-content">
          <div className="menu-panel">
            <div className="pos-heading"><div><span className="pos-eyebrow">The Santosa, Anmod · Menu</span><h3>Good food, coming up.</h3></div><span className="menu-count">6 items</span></div>
            <div className="category-list" role="group" aria-label="Filter menu by category">
              {categories.map((item) => <button key={item} className={category === item ? 'category-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <div className="menu-grid">
              {visibleItems.map((item) => (
                <article className="menu-item" key={item.id}>
                  <div className="menu-item-info"><div><span className="menu-item-category">{item.category}</span><h4>{item.name}</h4><p>{item.note}</p></div><strong>₹{item.price}</strong></div>
                  <button className="add-item" onClick={() => updateCart(item.id, 1)} aria-label={`Add ${item.name} to order`}><Icon name="plus" size={16} /> Add to order</button>
                </article>
              ))}
            </div>
          </div>
          <aside className="cart-panel">
            <div className="cart-heading"><div><span className="pos-eyebrow">CURRENT ORDER</span><h3>Table 04 <span>·</span> Dine in</h3></div><span className="cart-options" aria-hidden="true">•••</span></div>
            <div className="cart-items">
              {cartItems.length ? cartItems.map((item) => (
                <div className="cart-row" key={item.id}>
                  <div className="cart-item-name"><b>{item.name}</b><small>₹{item.price} each</small></div>
                  <div className="quantity-control"><button aria-label={`Remove one ${item.name}`} onClick={() => updateCart(item.id, -1)}><Icon name="minus" size={13} /></button><span>{cart[item.id]}</span><button aria-label={`Add one ${item.name}`} onClick={() => updateCart(item.id, 1)}><Icon name="plus" size={13} /></button></div>
                  <strong>₹{item.price * cart[item.id]}</strong>
                </div>
              )) : <div className="empty-cart"><span className="empty-bag"><Icon name="bag" size={22} /></span><b>Your order is waiting</b><p>Add something delicious from the menu.</p></div>}
            </div>
            <div className="cart-summary">
              <div><span>Subtotal</span><b>₹{subtotal}</b></div>
              <div><span>GST <small>(5%)</small></span><b>₹{Math.round(subtotal * 0.05)}</b></div>
              <div className="cart-total"><span>Total</span><b>₹{subtotal + Math.round(subtotal * 0.05)}</b></div>
              <button className="place-order" onClick={placeOrder}>Send order <span>{itemCount ? `· ${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : ''}</span><Icon name="arrowRight" size={17} /></button>
              {notice && <p className={`order-notice${notice.startsWith('Order') ? ' notice-success' : ''}`} role="status">{notice}</p>}
              <p className="demo-disclaimer">Demo only — no real order is placed.</p>
            </div>
          </aside>
        </div>
      ) : (
        <div className="tables-panel">
          <div className="pos-heading"><div><span className="pos-eyebrow">FLOOR OVERVIEW</span><h3>Table status</h3></div><span className="table-legend"><i /> Available <i className="legend-busy" /> Occupied</span></div>
          <div className="table-grid">{tables.map((table, index) => <div className={`table-card${[1, 3].includes(index) ? ' table-busy' : ''}`} key={table}><span className="table-number">TABLE {table}</span><span className="table-symbol"><Icon name="table" size={25} /></span><b>{[1, 3].includes(index) ? 'Occupied' : 'Available'}</b><small>{[1, 3].includes(index) ? `Order #${1042 + index}` : 'Ready for guests'}</small></div>)}</div>
          <p className="tables-note"><Icon name="sparkles" size={16} /> A quick look at the floor, so service stays in sync.</p>
        </div>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section" id="home">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-icon"><Icon name="sparkles" size={15} /></span> SMARTER RESTAURANT SOFTWARE</div>
            <h1>Smarter Business.<br /><em>Powered by MachMind360.</em></h1>
            <p className="hero-description">Modern solutions to streamline operations, boost productivity and grow your restaurant business.</p>
            <div className="hero-actions">
              <Link className="button-primary" to="/product">Explore Solutions <Icon name="arrowRight" size={17} /></Link>
              <Link className="button-secondary" to="/pos-demo">Watch Demo <Icon name="arrowRight" size={16} /></Link>
            </div>
            <div className="hero-proof"><span className="proof-rule" aria-hidden="true" /><p><b>Built for real restaurant service.</b><br />Designed for the people who keep it moving.</p></div>
          </div>
          <HeroDashboard />
          <div className="hero-ornament ornament-one" /><div className="hero-ornament ornament-two" />
        </div>
        <div className="hero-bottom"><span>BUILT WITH PURPOSE</span><i /><span>DESIGNED FOR PEOPLE</span><i /><span>READY FOR EVERYDAY</span></div>
      </section>

      <section className="home-product-story section-pad">
        <div className="section-container story-grid">
          <div className="story-copy">
            <span className="eyebrow">ONE CONNECTED RESTAURANT</span>
            <h2>From first order to final bill, <em>everything stays in sync.</em></h2>
            <p>Give your team one clear view of billing, tables, kitchen tickets and stock—without unnecessary complexity.</p>
            <Link className="text-arrow-link" to="/product">Explore the restaurant POS <Icon name="arrowRight" size={17} /></Link>
          </div>
          <div className="story-visual" aria-label="Illustrated restaurant operations overview">
            <div className="story-device">
              <div className="story-device-bar"><span /><b>Today&apos;s service</b><small>Live preview</small></div>
              <div className="story-service-grid">
                <div><span>SALES</span><strong>₹24,680</strong><small>86 orders served</small></div>
                <div><span>TABLES</span><strong>12 / 18</strong><small>Occupied</small></div>
                <div><span>KITCHEN</span><strong>04</strong><small>Preparing</small></div>
              </div>
              <div className="story-tablemap">
                {['01', '02', '03', '04', '05', '06'].map((table, index) => (
                  <div className={index === 1 || index === 4 ? 'story-table occupied' : 'story-table'} key={table}><Icon name="table" size={20} /><b>{table}</b></div>
                ))}
              </div>
            </div>
            <div className="story-kot-float"><span><Icon name="orders" size={17} /></span><div><b>Kitchen ticket</b><small>Table 02 · Preparing</small></div></div>
          </div>
        </div>
      </section>

      <section className="home-benefits section-pad">
        <div className="section-container">
          <div className="home-benefits-heading">
            <span className="eyebrow">MADE FOR EVERYDAY SERVICE</span>
            <h2>Less juggling.<br /><em>More good work.</em></h2>
          </div>
          <div className="benefit-editorial-grid">
            <article><span className="benefit-editorial-index">01</span><div className="benefit-editorial-icon"><Icon name="receipt" size={24} /></div><h3>Clear at the counter</h3><p>Build bills, handle dine-in and parcel orders, and keep service moving with one focused workflow.</p></article>
            <article><span className="benefit-editorial-index">02</span><div className="benefit-editorial-icon"><Icon name="table" size={24} /></div><h3>Aligned across service</h3><p>Keep tables, staff and kitchen activity easy to understand from the first order to closing.</p></article>
            <article><span className="benefit-editorial-index">03</span><div className="benefit-editorial-icon"><Icon name="chart" size={24} /></div><h3>Useful business visibility</h3><p>Review sales, stock alerts and reports in a format that makes the next decision clearer.</p></article>
          </div>
        </div>
      </section>

      <section className="home-mach section-pad">
        <div className="section-container home-mach-grid">
          <div className="mach-orbit-visual" aria-label="MACH AI assistant illustration">
            <div className="mach-orb"><Icon name="sparkles" size={34} /></div>
            <div className="mach-query mach-query-one">How did we do today?</div>
            <div className="mach-query mach-query-two">What needs attention?</div>
            <div className="mach-answer"><span>MACH</span><strong>₹24,680</strong><small>Today&apos;s sample sales</small></div>
          </div>
          <div className="home-mach-copy">
            <span className="eyebrow">INTRODUCING MACH</span>
            <h2>Meet MACH, <em>your AI assistant.</em></h2>
            <p>Explore business questions, stock reminders and useful restaurant insights through a clear conversational experience.</p>
            <Link className="text-arrow-link light" to="/mach">Discover MACH <Icon name="arrowRight" size={17} /></Link>
          </div>
        </div>
      </section>

      <WhyMachMind Icon={Icon} SectionHeading={SectionHeading} />

      <section className="home-final-cta">
        <div className="home-final-inner">
          <span className="eyebrow">READY FOR THE NEXT SHIFT?</span>
          <h2>Make everyday restaurant work feel <em>simpler.</em></h2>
          <div className="home-final-actions">
            <Link className="button-primary" to="/product">Explore the product <Icon name="arrowRight" size={16} /></Link>
            <Link className="button-secondary" to="/contact">Contact MachMind360 <Icon name="phone" size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

function ProductPage() {
  return (
    <>
      <section className="product-hero">
        <div className="section-container product-hero-grid">
          <div className="product-hero-copy">
            <span className="eyebrow">MACHMIND360 RESTAURANT POS</span>
            <h1>Every service,<br /><em>beautifully managed.</em></h1>
            <p>One restaurant workflow for dining rooms, counter billing, kitchens and business reporting.</p>
            <div className="product-hero-actions"><Link className="button-primary" to="/pos-demo">Explore POS Demo <Icon name="arrowRight" size={16} /></Link><Link className="text-arrow-link" to="/plans">View plans <Icon name="arrowRight" size={16} /></Link></div>
          </div>
          <div className="product-hero-visual">
            <HeroDashboard />
          </div>
        </div>
      </section>

      <section className="capability-story section-pad">
        <div className="section-container">
          <div className="capability-row">
            <div className="capability-copy"><span className="eyebrow">DINE-IN MANAGEMENT</span><h2>Turn tables into smooth service.</h2><p>Move from available to occupied, view active orders and keep the dining room clear to everyone who needs it.</p><ul><li>Table status and floor overview</li><li>Steward and captain details</li><li>Order status from one screen</li></ul></div>
            <div className="capability-visual table-visual"><div className="table-map-toolbar"><b>Floor overview</b><span>8 tables</span></div><div className="table-map-grid">{['01','02','03','04','05','06'].map((n,index)=><div className={index===1||index===4?'table-map-card occupied':'table-map-card'} key={n}><Icon name="table" size={24}/><b>TABLE {n}</b><small>{index===1||index===4?'Occupied':'Available'}</small></div>)}</div></div>
          </div>
          <div className="capability-row reverse">
            <div className="capability-copy"><span className="eyebrow">BILLING & PARCELS</span><h2>Build bills at the pace of service.</h2><p>Create dine-in or parcel orders, apply discounts and prepare bills without interrupting the counter rhythm.</p><ul><li>Menu search and categories</li><li>Portion-based billing</li><li>Cash, UPI, card and split options</li></ul></div>
            <div className="capability-visual billing-visual"><div className="billing-menu"><span>MENU</span><b>Chicken Dum Biryani</b><small>₹220 · Full</small><b>Paneer Tikka</b><small>₹220 · Full</small><b>Masala Buttermilk</b><small>₹38 · Full</small></div><div className="billing-ticket"><span>CURRENT BILL</span><div><b>Table 02</b><strong>₹542</strong></div><hr/><div><small>Subtotal</small><b>₹516</b></div><div><small>GST</small><b>₹26</b></div><button>Send KOT</button></div></div>
          </div>
          <div className="capability-row">
            <div className="capability-copy"><span className="eyebrow">KITCHEN DISPLAY</span><h2>Keep every KOT clear.</h2><p>Track new tickets, changes, cancellations and moved items as orders move through the kitchen.</p><ul><li>Distinctive KOT statuses</li><li>Preparation notes</li><li>Cancel or move items</li></ul></div>
            <div className="capability-visual kitchen-visual"><div className="kot-mock"><div><b>KOT-041</b><span>TABLE 02</span></div><article><b>Chicken Dum Biryani</b><strong>×2</strong><small>Preparing</small></article><article><b>Masala Buttermilk</b><strong>×2</strong><small>Preparing</small></article><footer><button>Mark ready</button></footer></div></div>
          </div>
          <div className="capability-row reverse">
            <div className="capability-copy"><span className="eyebrow">INVENTORY & REPORTS</span><h2>Know what is moving and what needs attention.</h2><p>Review ingredient levels, low-stock reminders and sales trends from one connected view.</p><ul><li>Ingredient and recipe tracking</li><li>Low-stock alerts</li><li>Sales and payment reports</li></ul></div>
            <div className="capability-visual inventory-visual"><div className="inventory-metric"><span>Today&apos;s sales</span><strong>₹48,620</strong><small>↑ 12.8%</small></div><div className="inventory-chart"><i/><i/><i/><i/><i/><i/><i/></div><div className="inventory-stock"><span><b>Rice</b><small>18.4 kg</small></span><span><b>Chicken</b><small>8.6 kg</small></span></div></div>
          </div>
        </div>
      </section>

      <section className="demo-section section-pad" id="demo">
        <div className="section-container">
          <div className="demo-header">
            <SectionHeading eyebrow="TAKE IT FOR A SPIN" title={<>A little hands-on<br /><span>is always better.</span></>} copy="Add a few favourites, adjust the order, then switch over to see the table view. This is a safe, interactive preview — no real orders are sent." align="left" />
          </div>
          <RestaurantDemo />
          <p className="demo-caption"><span><i /> INTERACTIVE PREVIEW</span><span>Sample menu &amp; prices for demonstration purposes.</span></p>
        </div>
      </section>
    </>
  )
}

function MachPage() {
  return (
    <>
      <AIAssistantShowcase Icon={Icon} />
      <section className="mach-page-cta">
        <div className="section-container mach-page-cta-inner">
          <div>
            <span className="eyebrow">EXPLORE MACHMIND360</span>
            <h2>Put the full restaurant workflow in focus.</h2>
          </div>
          <div className="mach-page-cta-actions">
            <Link className="button-primary" to="/pos-demo">Explore POS Demo <Icon name="arrowRight" size={16} /></Link>
            <Link className="text-arrow-link" to="/plans">View plans <Icon name="arrowRight" size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}

function PlansPage() {
  return <PricingPlans Icon={Icon} SectionHeading={SectionHeading} />
}

function AboutPage() {
  return (
    <section className="about-section section-pad" id="about">
      <div className="section-container about-inner">
        <div className="about-brand-display" aria-label="MachMind360 text wordmark">
          <span className="about-brand-overline">PRACTICAL SOFTWARE, THOUGHTFULLY MADE</span>
          <span className="about-brand-wordmark">MachMind<span>360</span></span>
          <span className="about-brand-rule" />
          <span className="about-brand-tagline">Built around people. Made for real business.</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">A LITTLE ABOUT US</span>
          <h2>We believe good technology should feel <em>human.</em></h2>
          <p>MachMind360 is a software company focused on building practical, thoughtful tools for real businesses. We look at the everyday friction, listen to the people doing the work, and design software that makes the next step easier.</p>
          <p>Our restaurant POS is one expression of that idea — practical tools designed around the people who use them.</p>
          <Link className="inline-link" to="/contact">Let&apos;s make work work better <Icon name="arrowRight" size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function ContactPage() {
  return <ContactSection Icon={Icon} SectionHeading={SectionHeading} />
}

function MarketingShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const titles = {
      '/': 'MachMind360 — Thoughtful software for better business',
      '/product': 'Restaurant POS Product · MachMind360',
      '/mach': 'MACH AI Assistant · MachMind360',
      '/plans': 'Plans & Pricing · MachMind360',
      '/about': 'About MachMind360',
      '/contact': 'Contact MachMind360',
    }
    document.title = titles[location.pathname] || 'MachMind360'
  }, [location.pathname])

  return (
    <div className="website">
      <div className="announcement"><span className="announcement-dot" /> Practical software for everyday restaurant operations <Link to="/product">Explore MachMind360 <Icon name="arrow" size={13} /></Link></div>
      <header className="navbar">
        <div className="nav-inner">
          <Brand />
          <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} size={21} /></button>
          <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`} aria-label="Main navigation">
            <NavLink to="/product" onClick={closeMenu}>Product</NavLink>
            <NavLink to="/mach" onClick={closeMenu}>Meet MACH</NavLink>
            <NavLink to="/plans" onClick={closeMenu}>Plans</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            <Link className="nav-mobile-cta" to="/contact" onClick={closeMenu}>Get Started <Icon name="arrow" size={16} /></Link>
          </nav>
          <Link className="nav-cta" to="/contact">Get Started <Icon name="arrow" size={16} /></Link>
        </div>
      </header>
      {location.pathname !== '/' && (
        <div className="inner-page-back-bar">
          <div className="inner-page-back-bar-inner">
            <BackButton />
          </div>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/mach" element={<MachPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-block"><Brand light /><p>Practical restaurant software.<br />Built for real everyday service.</p></div>
          <div className="footer-links"><span>EXPLORE</span><Link to="/product">The product</Link><Link to="/plans">Plans &amp; Pricing</Link><Link to="/mach">Meet MACH</Link></div>
          <div className="footer-links"><span>THE COMPANY</span><Link to="/about">About MachMind360</Link><Link to="/contact">Get in touch</Link></div>
          <div className="footer-links footer-contact"><span>CONTACT</span><a href="mailto:machmind360@gmail.com">machmind360@gmail.com</a><a href="tel:+919845357149">+91 9845357149</a></div>
          <Link className="back-top" to="/" aria-label="Back to home"><Icon name="arrow" size={18} /></Link>
        </div>
        <div className="footer-bottom"><span>© 2026 MachMind360. Made with care.</span><span>Software by MachMind360</span></div>
      </footer>
    </div>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/pos-demo') document.title = 'Restaurant POS Demo · MachMind360'
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/pos-demo" element={<PosDemo />} />
      <Route path="*" element={<MarketingShell />} />
    </Routes>
  )
}

export default App
