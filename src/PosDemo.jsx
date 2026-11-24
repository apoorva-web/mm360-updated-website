import { useEffect, useMemo, useState } from 'react'
import './PosDemo.css'
import './Readability.css'
import BackButton from './BackButton.jsx'

const menuItems = [
  { id: 'chicken-biryani', name: 'Chicken Dum Biryani', category: 'Biryani', price: 220, description: 'Dum cooked · serves 1', recipe: { rice: 0.14, chicken: 0.18, onions: 0.05, curd: 0.04 }, popular: true },
  { id: 'mutton-biryani', name: 'Mutton Dum Biryani', category: 'Biryani', price: 290, description: 'Slow cooked · serves 1', recipe: { rice: 0.14, mutton: 0.2, onions: 0.05, curd: 0.04 }, popular: true },
  { id: 'santosa-special', name: 'The Santosa Special Biryani', category: 'Biryani', price: 340, description: 'House special · serves 1', recipe: { rice: 0.16, chicken: 0.1, mutton: 0.1, onions: 0.06, curd: 0.05 }, popular: true },
  { id: 'veg-biryani', name: 'Veg Biryani', category: 'Biryani', price: 170, description: 'Garden fresh · serves 1', recipe: { rice: 0.13, paneer: 0.08, onions: 0.04, curd: 0.03 } },
  { id: 'chicken-65', name: 'Chicken 65', category: 'Starters', price: 210, description: 'Crispy · 6 pieces', recipe: { chicken: 0.18, onions: 0.03, curd: 0.03 } },
  { id: 'chicken-kabab', name: 'Chicken Kabab', category: 'Starters', price: 190, description: 'Chargrilled · 4 pieces', recipe: { chicken: 0.2, curd: 0.04 } },
  { id: 'paneer-tikka', name: 'Paneer Tikka', category: 'Starters', price: 220, description: 'Tandoor roasted · 6 pieces', recipe: { paneer: 0.16, curd: 0.05, onions: 0.02 } },
  { id: 'chicken-curry', name: 'Andhra Chicken Curry', category: 'Curries', price: 230, description: 'House masala · serves 1', recipe: { chicken: 0.2, onions: 0.07, curd: 0.05 } },
  { id: 'dal-tadka', name: 'Dal Tadka', category: 'Curries', price: 145, description: 'Yellow lentils · serves 1', recipe: { lentils: 0.14, onions: 0.03, curd: 0.02 } },
  { id: 'butter-naan', name: 'Butter Naan', category: 'Breads', price: 48, description: 'Tandoor baked · each', recipe: { flour: 0.08, dairy: 0.02 } },
  { id: 'tandoori-roti', name: 'Tandoori Roti', category: 'Breads', price: 32, description: 'Whole wheat · each', recipe: { flour: 0.07 } },
  { id: 'masala-buttermilk', name: 'Masala Buttermilk', category: 'Drinks', price: 38, description: 'Chilled · 250 ml', recipe: { dairy: 0.22 } },
  { id: 'lime-soda', name: 'Fresh Lime Soda', category: 'Drinks', price: 58, description: 'Sweet or salted · 300 ml', recipe: { lemons: 0.04, soda: 0.3 } },
]

const initialInventory = [
  { id: 'rice', name: 'Basmati rice', category: 'Grains', quantity: 18.4, unit: 'kg', par: 5, cost: 185 },
  { id: 'chicken', name: 'Fresh chicken', category: 'Poultry', quantity: 8.6, unit: 'kg', par: 3, cost: 285 },
  { id: 'mutton', name: 'Mutton', category: 'Meat', quantity: 4.8, unit: 'kg', par: 2, cost: 720 },
  { id: 'paneer', name: 'Fresh paneer', category: 'Dairy', quantity: 3.2, unit: 'kg', par: 1.5, cost: 340 },
  { id: 'onions', name: 'Red onions', category: 'Produce', quantity: 12.5, unit: 'kg', par: 4, cost: 38 },
  { id: 'curd', name: 'Curd & marinade', category: 'Dairy', quantity: 5.4, unit: 'kg', par: 2, cost: 72 },
  { id: 'lentils', name: 'Toor dal', category: 'Grains', quantity: 1.1, unit: 'kg', par: 1.5, cost: 142 },
  { id: 'flour', name: 'Whole wheat flour', category: 'Grains', quantity: 9.2, unit: 'kg', par: 3, cost: 44 },
  { id: 'dairy', name: 'Butter & dairy', category: 'Dairy', quantity: 4.3, unit: 'kg', par: 1.5, cost: 260 },
  { id: 'lemons', name: 'Fresh lemons', category: 'Produce', quantity: 0.8, unit: 'kg', par: 1.2, cost: 95 },
  { id: 'soda', name: 'Soda water', category: 'Beverages', quantity: 14.5, unit: 'L', par: 5, cost: 32 },
]

const initialTables = [
  { id: '01', section: 'Main hall', seats: 2, status: 'Available' },
  { id: '02', section: 'Main hall', seats: 4, status: 'Occupied', serviceState: 'Running KOT', orderId: 'TS-1048' },
  { id: '03', section: 'Main hall', seats: 4, status: 'Available' },
  { id: '04', section: 'Main hall', seats: 6, status: 'Reserved' },
  { id: '05', section: 'Courtyard', seats: 4, status: 'Occupied', serviceState: 'Order ready', orderId: 'TS-1046' },
  { id: '06', section: 'Courtyard', seats: 2, status: 'Available' },
  { id: '07', section: 'Courtyard', seats: 6, status: 'Occupied', serviceState: 'Running KOT', orderId: 'TS-1041' },
  { id: '08', section: 'Courtyard', seats: 4, status: 'Available' },
]

const initialOrders = [
  { id: 'TS-1048', type: 'Dine in', table: '02', guest: 'Table 02', items: [{ name: 'Chicken Dum Biryani', quantity: 2 }, { name: 'Masala Buttermilk', quantity: 2 }], total: 542, status: 'Preparing', time: '12:42 PM', createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString() },
  { id: 'TS-1046', type: 'Dine in', table: '05', guest: 'Table 05', items: [{ name: 'Mutton Dum Biryani', quantity: 2 }, { name: 'Chicken 65', quantity: 1 }], total: 830, status: 'Ready', time: '12:35 PM', createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString() },
  { id: 'TS-1041', type: 'Dine in', table: '07', guest: 'Table 07', items: [{ name: 'The Santosa Special Biryani', quantity: 1 }, { name: 'Paneer Tikka', quantity: 1 }], total: 588, status: 'Preparing', time: '12:29 PM', createdAt: new Date(Date.now() - 31 * 60 * 1000).toISOString() },
  { id: 'TS-1042', type: 'Takeaway', table: null, guest: 'Walk-in', items: [{ name: 'Veg Biryani', quantity: 2 }, { name: 'Fresh Lime Soda', quantity: 1 }], total: 418, status: 'Completed', time: '12:18 PM', createdAt: new Date(Date.now() - 42 * 60 * 1000).toISOString() },
]

const navigation = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'billing', label: 'Billing', icon: 'billing' },
  { id: 'orders', label: 'Orders', icon: 'orders' },
  { id: 'tables', label: 'Tables', icon: 'tables' },
  { id: 'kitchen', label: 'Kitchen', icon: 'orders' },
  { id: 'inventory', label: 'Inventory', icon: 'inventory' },
  { id: 'reports', label: 'Reports', icon: 'reports' },
  { id: 'ai-assistant', label: 'MACH', icon: 'spark' },
  { id: 'staff-settings', label: 'Staff & settings', icon: 'user' },
]

const roleScreens = {
  Owner: navigation.map((item) => item.id),
  Cashier: ['overview', 'billing', 'orders', 'tables', 'reports'],
  Waiter: ['overview', 'billing', 'orders', 'tables', 'kitchen'],
  Chef: ['kitchen', 'inventory'],
}

const roleProfiles = {
  Owner: { name: 'Arjun K.', initials: 'AK' },
  Cashier: { name: 'Meera S.', initials: 'MS' },
  Waiter: { name: 'Riya P.', initials: 'RP' },
  Chef: { name: 'Kumar S.', initials: 'KS' },
}

const categories = ['All menu', 'Biryani', 'Starters', 'Curries', 'Breads', 'Drinks']
const reportRanges = ['Today', '7 days', '30 days']
const portionSizes = [
  { label: 'Half', multiplier: 0.65 },
  { label: 'Full', multiplier: 1 },
  { label: '1 kg', multiplier: 2.5 },
]
const portionsByCategory = {
  Biryani: portionSizes,
  Starters: portionSizes.filter((size) => size.label !== '1 kg'),
  Curries: portionSizes.filter((size) => size.label !== '1 kg'),
  Breads: portionSizes.filter((size) => size.label === 'Full'),
  Drinks: portionSizes.filter((size) => size.label === 'Full'),
}
const demoStorageKey = 'machmind360-pos-demo-v1'
const serviceDateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date()).toUpperCase()
const headerDateLabel = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }).format(new Date())

const portionMultiplier = (portion) => portionSizes.find((size) => size.label === portion)?.multiplier || 1
const portionPrice = (item, portion) => Math.round(item.price * portionMultiplier(portion))
const cartLineId = (itemId, portion) => `${itemId}::${portion}`
const draftKey = (context) => context.type === 'Parcel' ? `parcel:${context.parcelNumber}` : `table:${context.tableId}`
const createEmptyDraft = () => ({ items: [], steward: 'Riya', captain: 'Aditya', discountPercent: 0, guestCount: 1, held: false })

const createInitialKots = () => initialOrders
  .filter((order) => order.status !== 'Completed')
  .map((order, index) => ({
    id: `KOT-${String(38 + index).padStart(3, '0')}`,
    orderId: order.id,
    type: 'Dine in',
    table: order.table,
    parcelNumber: null,
    createdAt: new Date(Date.now() - (index + 1) * 5 * 60 * 1000).toISOString(),
    status: order.status === 'Ready' ? 'Ready' : 'Preparing',
    kind: 'original',
    steward: 'Riya',
    captain: 'Aditya',
    sourceKotId: null,
    items: order.items.map((line, lineIndex) => {
      const menuItem = menuItems.find((item) => item.name === line.name)
      return {
        id: `${order.id}-ITEM-${lineIndex + 1}`,
        menuItemId: menuItem?.id || '',
        name: line.name,
        portion: 'Full',
        price: menuItem?.price || 0,
        quantity: line.quantity,
        activeQuantity: line.quantity,
        cancelledQuantity: 0,
        movedQuantity: 0,
        notes: '',
      }
    }),
  }))

const createInitialDemoData = () => ({
  inventory: initialInventory,
  soldOutItemIds: [],
  tables: initialTables,
  orders: initialOrders,
  kots: createInitialKots(),
  drafts: {},
  parcelNumbers: [],
  nextOrderNumber: 1054,
  nextKotNumber: 41,
  nextParcelNumber: 1,
  dailySales: 48620,
  dailyOrderCount: 124,
})

const isStoredDemoData = (value) => value
  && Array.isArray(value.inventory)
  && (value.soldOutItemIds === undefined || Array.isArray(value.soldOutItemIds))
  && Array.isArray(value.tables)
  && Array.isArray(value.orders)
  && Array.isArray(value.kots)
  && Array.isArray(value.parcelNumbers)
  && value.drafts
  && typeof value.drafts === 'object'
  && Number.isInteger(value.nextOrderNumber)
  && Number.isInteger(value.nextKotNumber)
  && Number.isInteger(value.nextParcelNumber)
  && Number.isFinite(value.dailySales)
  && Number.isFinite(value.dailyOrderCount)

const migrateOrderId = (orderId) => orderId?.startsWith('MB-') ? `TS-${orderId.slice(3)}` : orderId

const migrateMenuLine = (line) => {
  let updated = line
  if (line.name?.endsWith('Special Biryani')) {
    updated = { ...line, name: 'The Santosa Special Biryani' }
    if (line.menuItemId || line.id?.includes('::')) updated.menuItemId = 'santosa-special'
    if (line.id?.includes('::')) updated.id = `santosa-special::${line.id.split('::')[1]}`
  }
  if (updated.id?.startsWith('MB-')) updated = { ...updated, id: migrateOrderId(updated.id) }
  return updated
}

const migrateDemoData = (data) => ({
  ...data,
  soldOutItemIds: data.soldOutItemIds || [],
  tables: data.tables.map((table) => ({ ...table, orderId: migrateOrderId(table.orderId) })),
  orders: data.orders.map((order) => ({
    ...order,
    id: migrateOrderId(order.id),
    createdAt: order.createdAt || new Date().toISOString(),
    items: order.items.map(migrateMenuLine),
  })),
  kots: data.kots.map((kot) => ({
    ...kot,
    orderId: migrateOrderId(kot.orderId),
    items: kot.items.map(migrateMenuLine),
  })),
  drafts: Object.fromEntries(Object.entries(data.drafts).map(([key, draft]) => [
    key,
    { ...createEmptyDraft(), ...draft, items: draft.items.map(migrateMenuLine) },
  ])),
})

const loadDemoData = () => {
  try {
    const saved = window.localStorage.getItem(demoStorageKey)
    if (!saved) return { data: createInitialDemoData(), warning: '' }

    const parsed = JSON.parse(saved)
    if (parsed.version !== 1 || !isStoredDemoData(parsed.data)) {
      throw new Error('The saved sample workspace has an unsupported format.')
    }
    return { data: migrateDemoData(parsed.data), warning: '' }
  } catch (error) {
    console.error('Could not load the saved POS demo workspace.', error)
    return {
      data: createInitialDemoData(),
      warning: 'Saved demo data could not be loaded. A fresh sample workspace is in use.',
    }
  }
}

const getActiveKotItems = (kots, orderId) => kots
  .filter((kot) => kot.orderId === orderId && kot.kind !== 'duplicate')
  .flatMap((kot) => kot.items
    .filter((item) => item.activeQuantity > 0)
    .map((item) => ({ ...item, quantity: item.activeQuantity, kotId: kot.id })))

const getOrderKitchenStatus = (kots, orderId) => {
  const activeKots = kots.filter((kot) => kot.orderId === orderId && kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0))
  return activeKots.length && activeKots.every((kot) => kot.status === 'Ready') ? 'Ready' : 'Preparing'
}

const getTableKitchenState = (kots, orderId) => {
  const hasActiveKots = kots.some((kot) => kot.orderId === orderId && kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0))
  if (!hasActiveKots) return 'Running'
  return getOrderKitchenStatus(kots, orderId) === 'Ready' ? 'Order ready' : 'Running KOT'
}

const sumOrderItems = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)

const findOrderForContext = (orders, context) => orders.find((order) => !order.paid && (
  context.type === 'Dine in'
    ? order.type === 'Dine in' && order.table === context.tableId
    : order.type === 'Parcel' && order.parcelNumber === context.parcelNumber
) && (order.status !== 'Completed' || order.items.some((item) => item.quantity > 0)))

const createKotFromDraft = (current, context) => {
  const key = draftKey(context)
  const draft = current.drafts[key] || createEmptyDraft()
  if (!draft.items.length) return { data: current, kot: null }

  const existingOrder = findOrderForContext(current.orders, context)
  const orderId = existingOrder?.id || `TS-${String(current.nextOrderNumber).padStart(4, '0')}`
  const kotId = `KOT-${String(current.nextKotNumber).padStart(3, '0')}`
  const createdAt = new Date().toISOString()
  const kot = {
    id: kotId,
    orderId,
    type: context.type,
    table: context.type === 'Dine in' ? context.tableId : null,
    parcelNumber: context.type === 'Parcel' ? context.parcelNumber : null,
    createdAt,
    status: 'Pending',
    kind: existingOrder ? 'changed' : 'original',
    steward: context.type === 'Dine in' ? draft.steward : '',
    captain: context.type === 'Dine in' ? draft.captain : '',
    sourceKotId: null,
    items: draft.items.map((item, index) => ({
      ...item,
      id: `${kotId}-ITEM-${index + 1}`,
      activeQuantity: item.quantity,
      cancelledQuantity: 0,
      movedQuantity: 0,
    })),
  }
  const kots = [kot, ...current.kots]
  const activeItems = getActiveKotItems(kots, orderId)
  const order = {
    ...(existingOrder || {}),
    id: orderId,
    type: context.type,
    table: context.type === 'Dine in' ? context.tableId : null,
    parcelNumber: context.type === 'Parcel' ? context.parcelNumber : null,
    guest: context.type === 'Dine in' ? `Table ${context.tableId}` : `Parcel ${context.parcelNumber}`,
    items: activeItems,
    total: sumOrderItems(activeItems),
    status: 'Preparing',
    time: new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date(createdAt)),
    createdAt: existingOrder?.createdAt || createdAt,
    billTotal: undefined,
  }
  const orders = existingOrder
    ? current.orders.map((item) => item.id === orderId ? order : item)
    : [order, ...current.orders]
  const tables = context.type === 'Dine in'
    ? current.tables.map((table) => table.id === context.tableId
      ? { ...table, status: 'Occupied', serviceState: 'Running KOT', orderId, startedAt: table.startedAt || createdAt }
      : table)
    : current.tables

  return {
    data: {
      ...current,
      kots,
      orders,
      tables,
      nextOrderNumber: existingOrder ? current.nextOrderNumber : current.nextOrderNumber + 1,
      nextKotNumber: current.nextKotNumber + 1,
      drafts: { ...current.drafts, [key]: { ...draft, items: [] } },
    },
    kot,
  }
}

const iconDrawings = {
  overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1" /><rect x="13.5" y="3.5" width="7" height="7" rx="1" /><rect x="3.5" y="13.5" width="7" height="7" rx="1" /><rect x="13.5" y="13.5" width="7" height="7" rx="1" /></>,
  billing: <><path d="M5 3.5h14v17l-3.5-2-3.5 2-3.5-2L5 20.5v-17Z" /><path d="M8.5 8h7M8.5 12h7M8.5 16h3" /></>,
  orders: <><path d="M7 4h13v17H7zM4 7H3v14h13v-1" /><path d="M10 9h6M10 13h6M10 17h3" /></>,
  tables: <><path d="M4 6h16M6 6v5h12V6M7 11v9m10-9v9M4 20h16" /><path d="M9 8.5h.01M15 8.5h.01" /></>,
  inventory: <><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="M4 7.5v9l8 4.5 8-4.5v-9M12 12v9" /></>,
  reports: <><path d="M4 20V5m0 15h17" /><path d="m7 15 4-4 3 2 6-7" /><path d="M16 6h4v4" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  print: <><path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" /><path d="M7 14h10v7H7zM17 11h.01" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  warning: <><path d="m12 3 9 17H3L12 3Z" /><path d="M12 9v4m0 3h.01" /></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 17v4h14v-4" /></>,
  spark: <><path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z" /></>,
  phone: <><path d="M8 3H5a2 2 0 0 0-2 2 16 16 0 0 0 16 16 2 2 0 0 0 2-2v-3l-5-2-2 3a13 13 0 0 1-6-6l3-2-3-6Z" /></>,
  cart: <><path d="M3 4h2l2 11h11l2-8H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
}

function Icon({ name, size = 18 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{iconDrawings[name] || iconDrawings.spark}</svg>
}

const formatCurrency = (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`
const formatQuantity = (amount) => Number.isInteger(amount) ? String(amount) : amount.toFixed(1)
const splitAmountAcrossGuests = (amount, guestCount) => {
  const count = Math.max(1, Math.floor(Number(guestCount) || 1))
  const wholeRupees = Math.round(amount)
  const share = Math.floor(wholeRupees / count)
  const remainder = wholeRupees % count
  return Array.from({ length: count }, (_, index) => share + (index < remainder ? 1 : 0))
}

function StatusBadge({ status }) {
  const statusClass = status.toLowerCase().replaceAll(' ', '-')
  return <span className={`status-badge status-${statusClass}`}><i />{status}</span>
}

function PageTitle({ eyebrow, title, copy, action }) {
  return (
    <div className="page-title-row">
      <div>
        <div className="page-eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
      {action}
    </div>
  )
}

function MetricCard({ label, value, note, icon, change, tone = 'orange' }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon metric-${tone}`}><Icon name={icon} size={19} /></div>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-note"><b>{change}</b> {note}</span>
    </article>
  )
}

function SalesChart({ values, labels, compact = false }) {
  const max = Math.max(...values)
  return (
    <div className={`sales-chart${compact ? ' sales-chart-compact' : ''}`} role="img" aria-label="Sales bar chart">
      {values.map((value, index) => (
        <div className="sales-chart-column" key={`${labels[index]}-${index}`} title={`${labels[index]}: ${formatCurrency(value)}`}>
          <div className="sales-chart-bar-wrap"><span className={`sales-chart-bar${index === values.indexOf(max) ? ' bar-best' : ''}`} style={{ height: `${Math.max(8, (value / max) * 100)}%` }} /></div>
          <span className="sales-chart-label">{labels[index]}</span>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ icon = 'cart', title, copy, action }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon"><Icon name={icon} size={24} /></span>
      <h3>{title}</h3>
      <p>{copy}</p>
      {action}
    </div>
  )
}

function OverviewScreen({ onNavigate, dailySales, dailyOrderCount, orders, inventory }) {
  const busyOrders = orders.filter((order) => order.status !== 'Completed').length
  const lowStock = inventory.filter((item) => item.quantity <= item.par).length
  const sampleValues = [4200, 6100, 4700, 8100, 5900, 11200, Math.max(8300, dailySales - 40200)]
  const recentOrders = orders.slice(0, 4)
  const dineInOrders = Math.round(dailyOrderCount * 0.68)
  const orderTypeSummary = [
    { label: 'Dine-in', orders: dineInOrders, sales: Math.round(dailySales * 0.72) },
    { label: 'Parcel', orders: dailyOrderCount - dineInOrders, sales: dailySales - Math.round(dailySales * 0.72) },
  ]
  const paymentSummary = [
    { label: 'Cash', sales: Math.round(dailySales * 0.56) },
    { label: 'UPI', sales: Math.round(dailySales * 0.32) },
    { label: 'Card', sales: Math.round(dailySales * 0.07) },
    { label: 'Split', sales: dailySales - Math.round(dailySales * 0.95) },
  ]

  return (
    <>
      <PageTitle eyebrow={`${serviceDateLabel} · SERVICE OVERVIEW`} title="Good afternoon, team" copy="Here is how things are moving at The Santosa, Anmod today." action={<button className="button-primary" onClick={() => onNavigate('billing')}><Icon name="plus" size={16} /> New bill</button>} />
      <div className="metric-grid">
        <MetricCard label="Today's sales" value={formatCurrency(dailySales)} change="+12.8%" note="vs. last Sunday" icon="reports" tone="orange" />
        <MetricCard label="Orders today" value={dailyOrderCount.toLocaleString('en-IN')} change="+8" note="since yesterday" icon="billing" tone="green" />
        <MetricCard label="Average order" value={formatCurrency(dailySales / dailyOrderCount)} change="+4.2%" note="vs. last Sunday" icon="cart" tone="gold" />
        <MetricCard label="Open orders" value={String(busyOrders).padStart(2, '0')} change={`${lowStock} low`} note="stock alerts" icon="clock" tone="plum" />
      </div>
      <div className="overview-grid">
        <section className="panel sales-overview-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">SALES PERFORMANCE</span><h2>Today at a glance</h2></div><button className="text-button" onClick={() => onNavigate('reports')}>View reports <Icon name="arrow" size={15} /></button></div>
          <div className="chart-legend"><span><i /> Sales</span><span className="chart-total">{formatCurrency(dailySales)}</span></div>
          <SalesChart values={sampleValues} labels={['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM']} />
          <div className="chart-footnote"><span><b>Peak hour</b> · 8:00 PM – 9:00 PM</span><span>Sample performance data</span></div>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">SAMPLE SERVICE</span><h2>Recent orders</h2></div><button className="icon-link-button" aria-label="View all orders" onClick={() => onNavigate('orders')}><Icon name="arrow" size={16} /></button></div>
          <div className="activity-list">
            {recentOrders.map((order) => (
              <div className="activity-row" key={order.id}>
                <span className={`activity-order-icon${order.status === 'Completed' ? ' activity-done' : ''}`}><Icon name={order.type === 'Takeaway' || order.type === 'Parcel' ? 'phone' : 'tables'} size={16} /></span>
                <div className="activity-order"><b>{order.id} <span>· {order.guest}</span></b><small>{order.time} · {order.items.reduce((sum, item) => sum + item.quantity, 0)} items</small></div>
                <div className="activity-total"><b>{formatCurrency(order.total)}</b><StatusBadge status={order.status} /></div>
              </div>
            ))}
          </div>
          <button className="panel-bottom-link" onClick={() => onNavigate('orders')}>Open order management <Icon name="arrow" size={14} /></button>
        </section>
      </div>
      <div className="dashboard-summary-grid">
        <section className="panel dashboard-breakdown-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">ORDER MIX</span><h2>Dine-in & parcel</h2></div><Icon name="tables" size={18} /></div>
          {orderTypeSummary.map((item) => <div className="dashboard-breakdown-row" key={item.label}><span>{item.label}<small>{item.orders} sample orders</small></span><b>{formatCurrency(item.sales)}</b></div>)}
          <p>Illustrative split of the demo's daily totals.</p>
        </section>
        <section className="panel dashboard-breakdown-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">PAYMENT MIX</span><h2>Recorded by method</h2></div><Icon name="billing" size={18} /></div>
          {paymentSummary.map((item) => <div className="dashboard-breakdown-row" key={item.label}><span>{item.label}<small>Simulated payment</small></span><b>{formatCurrency(item.sales)}</b></div>)}
          <p>Sample allocation only · no real payments are processed.</p>
        </section>
      </div>
      <div className="overview-bottom-grid">
        <section className="quick-action-card">
          <div className="quick-action-copy"><span className="quick-action-kicker"><Icon name="spark" size={15} /> SERVICE SHORTCUT</span><h2>Ready for the next order?</h2><p>Build a bill and send a demo order through the kitchen workflow.</p><button className="button-primary" onClick={() => onNavigate('billing')}>Start a new bill <Icon name="arrow" size={15} /></button></div>
          <div className="quick-action-graphic"><span className="graphic-orbit orbit-outer" /><span className="graphic-orbit orbit-inner" /><span className="graphic-ticket"><Icon name="billing" size={26} /></span><span className="graphic-spark">✳</span></div>
        </section>
        <section className="panel stock-alert-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">KEEP AN EYE ON</span><h2>Stock reminders</h2></div><button className="text-button" onClick={() => onNavigate('inventory')}>Inventory <Icon name="arrow" size={15} /></button></div>
          {inventory.filter((item) => item.quantity <= item.par).slice(0, 3).map((item) => (
            <div className="stock-alert-row" key={item.id}><span className="stock-alert-icon"><Icon name="warning" size={16} /></span><div><b>{item.name}</b><small>Reorder point · {formatQuantity(item.par)} {item.unit}</small></div><strong>{formatQuantity(item.quantity)} <small>{item.unit}</small></strong></div>
          ))}
          {!lowStock && <div className="all-stock-ok"><Icon name="check" size={17} /> All items are above their reorder point.</div>}
        </section>
      </div>
    </>
  )
}

function BillingScreen({
  menuStock,
  cart,
  orderItems,
  onAdd,
  onChange,
  onUpdateNote,
  onToggleComplimentary,
  onToggleSoldOut,
  soldOutItemIds,
  onToggleHold,
  onGenerate,
  onSendKot,
  subtotal,
  discountAmount,
  discountPercent,
  taxableSubtotal,
  tax,
  total,
  orderType,
  setOrderType,
  selectedTable,
  setSelectedTable,
  tables,
  paymentMethod,
  setPaymentMethod,
  notice,
  setNotice,
  selectedPortions,
  setSelectedPortion,
  parcelNumbers,
  activeParcelNumber,
  onCreateParcel,
  onSelectParcel,
  draft,
  onUpdateDraft,
  activeOrderId,
}) {
  const [category, setCategory] = useState('All menu')
  const [search, setSearch] = useState('')
  const filteredItems = menuItems.filter((item) => (category === 'All menu' || item.category === category) && item.name.toLowerCase().includes(search.toLowerCase()))
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const orderCount = orderItems.reduce((sum, item) => sum + item.quantity, 0)
  const isHeld = Boolean(draft.held)
  const guestCount = Math.max(1, Number(draft.guestCount) || 1)
  const guestShares = splitAmountAcrossGuests(total, guestCount)

  return (
    <>
      <PageTitle eyebrow="POINT OF SALE · NEW ORDER" title="Create a bill" copy="Add menu items to build a new order. Everything here is sample data." action={<span className="screen-live-label"><i /> DEMO REGISTER OPEN</span>} />
      <div className="billing-layout">
        <section className="menu-panel panel">
          <div className="menu-panel-top"><div><span className="panel-eyebrow">The Santosa, Anmod · Menu</span><h2>What can we get started?</h2></div><span className="menu-item-count">{menuItems.length} menu items</span></div>
          <div className="menu-controls">
            <div className="menu-categories" aria-label="Menu categories">
              {categories.map((item) => <button key={item} className={category === item ? 'category-selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <label className="menu-search"><Icon name="search" size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search menu" aria-label="Search menu" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" size={14} /></button>}</label>
          </div>
          <div className="menu-item-grid">
            {filteredItems.map((item) => {
              const portion = selectedPortions[item.id] || 'Full'
              const availablePortionsForItem = portionsByCategory[item.category] || portionsByCategory.Breads
              const quantity = menuStock(item, portion)
              const inCart = cart.filter((line) => line.menuItemId === item.id && line.portion === portion).reduce((sum, line) => sum + line.quantity, 0)
              const manuallySoldOut = soldOutItemIds.includes(item.id)
              const soldOut = manuallySoldOut || quantity <= 0
              return (
                <article className={`pos-menu-item${soldOut ? ' menu-sold-out' : ''}`} key={item.id}>
                  <div className="pos-menu-item-copy">
                    <div className="pos-menu-item-heading">
                      <div className="pos-menu-item-meta"><span className="pos-menu-category">{item.category}</span>{item.popular && <span className="popular-tag">POPULAR</span>}</div>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </div>
                    <strong>{formatCurrency(portionPrice(item, portion))}</strong>
                  </div>
                  <label className="portion-select-label">Portion
                    <select aria-label={`Portion size for ${item.name}`} value={portion} onChange={(event) => setSelectedPortion(item.id, event.target.value)} disabled={isHeld}>
                      {availablePortionsForItem.map((size) => <option value={size.label} key={size.label}>{size.label}</option>)}
                    </select>
                  </label>
                  <div className="menu-card-footer">
                    <span className={quantity < 5 || soldOut ? 'portions-low' : ''}>{manuallySoldOut ? 'Sold out' : quantity <= 0 ? 'Out of stock' : `${quantity} portions available`}</span>
                    <button className="menu-stock-toggle" aria-label={`${manuallySoldOut ? 'Mark available' : 'Mark sold out'}: ${item.name}`} onClick={() => onToggleSoldOut(item.id)}>{manuallySoldOut ? 'Mark available' : 'Mark sold out'}</button>
                    <button disabled={soldOut || inCart >= quantity || isHeld} onClick={() => onAdd(item, portion)} aria-label={`Add ${item.name} ${portion} to bill`}><Icon name="plus" size={15} />{inCart ? `Add more · ${inCart}` : 'Add to bill'}</button>
                  </div>
                </article>
              )
            })}
            {!filteredItems.length && <div className="menu-no-results"><Icon name="search" size={19} /><b>No menu items match “{search}”</b><button onClick={() => { setSearch(''); setCategory('All menu') }}>Clear filters</button></div>}
          </div>
        </section>

        <aside className="bill-panel panel">
          <div className="bill-panel-title"><div><span className="panel-eyebrow">CURRENT BILL</span><h2>New order</h2></div><span className={`bill-number${isHeld ? ' bill-number-held' : ''}`}>{isHeld ? 'ON HOLD' : 'DRAFT'}</span></div>
          <div className="order-mode-row">
            <div className="order-mode-select" role="group" aria-label="Order type">
              {['Dine in', 'Parcel'].map((type) => <button className={orderType === type ? 'mode-selected' : ''} key={type} onClick={() => { setOrderType(type); setNotice('') }}><Icon name={type === 'Dine in' ? 'tables' : 'phone'} size={15} />{type}</button>)}
            </div>
            <button className="parcel-create-button" onClick={onCreateParcel}>+ Parcel</button>
          </div>
          {orderType === 'Parcel' && <div className="parcel-selector" aria-label="Parcel orders">
            {parcelNumbers.map((number) => <button className={activeParcelNumber === number ? 'parcel-selected' : ''} key={number} onClick={() => onSelectParcel(number)}>Parcel {number}</button>)}
            {!parcelNumbers.length && <span>Start a parcel order with + Parcel.</span>}
          </div>}
          {orderType === 'Dine in' ? (
            <label className="table-select-label">Assign a table
              <span className="table-select-wrap"><Icon name="tables" size={16} /><select value={selectedTable || ''} onChange={(event) => setSelectedTable(event.target.value)} aria-label="Select a table">{tables.filter((table) => table.status === 'Available' || (table.status === 'Occupied' && table.serviceState !== 'Paid') || table.id === selectedTable).map((table) => <option value={table.id} key={table.id}>Table {table.id} · {table.seats} seats · {table.serviceState || table.status}</option>)}{!tables.some((table) => table.status === 'Available') && !selectedTable && <option value="" disabled>No available tables</option>}</select><Icon name="chevron" size={15} /></span>
            </label>
          ) : <div className="takeaway-note"><Icon name="phone" size={15} /><span>Independent parcel order · Parcel {activeParcelNumber || '—'}</span></div>}
          {orderType === 'Dine in' && <div className="kot-contact-fields">
            <label>Steward<input value={draft.steward} onChange={(event) => onUpdateDraft('steward', event.target.value)} aria-label="Steward name" placeholder="Steward name" /></label>
            <label>Captain<input value={draft.captain} onChange={(event) => onUpdateDraft('captain', event.target.value)} aria-label="Captain name" placeholder="Captain name" /></label>
          </div>}
          <div className="bill-lines-heading"><span>ITEM</span><span>QTY</span><span>AMOUNT</span></div>
          <div className="bill-line-list">
            {orderItems.map((item) => (
              <div className="bill-line bill-line-sent" key={item.id}>
                <div className="bill-line-name"><b>{item.name} <small>({item.portion})</small></b><small>{item.kotId} · Sent to kitchen{item.complimentary ? ' · COMPLIMENTARY' : ''}</small>{item.notes && <small className="bill-line-note-preview">{item.notes}</small>}</div>
                <span className="bill-sent-quantity">× {item.quantity}</span>
                <b className="bill-line-total">{formatCurrency(item.price * item.quantity)}</b>
              </div>
            ))}
            {cart.map((item) => (
              <div className="bill-line bill-line-draft" key={item.id}>
                <div className="bill-line-name"><b>{item.name} <small>({item.portion})</small></b><small>{item.complimentary ? 'Complimentary · ₹0' : `${formatCurrency(item.price)} each · Not sent`}</small>
                  <input className="bill-line-note" aria-label={`Preparation note for ${item.name} ${item.portion}`} value={item.notes} onChange={(event) => onUpdateNote(item.id, event.target.value)} placeholder="Special preparation note" disabled={isHeld} />
                  <button className={`complimentary-toggle${item.complimentary ? ' complimentary-active' : ''}`} aria-label={`${item.complimentary ? 'Remove complimentary status from' : 'Mark'} ${item.name} ${item.portion} complimentary`} onClick={() => onToggleComplimentary(item.id)} disabled={isHeld}>{item.complimentary ? 'Remove complimentary' : 'Mark complimentary'}</button>
                </div>
                <div className="bill-quantity"><button aria-label={`Remove one ${item.name} ${item.portion}`} onClick={() => onChange(item.id, -1)} disabled={isHeld}><Icon name="minus" size={12} /></button><span>{item.quantity}</span><button aria-label={`Add one ${item.name} ${item.portion}`} onClick={() => onChange(item.id, 1)} disabled={isHeld}><Icon name="plus" size={12} /></button></div>
                <b className="bill-line-total">{formatCurrency(item.price * item.quantity)}</b>
              </div>
            ))}
            {!orderItems.length && !cart.length && <EmptyState icon="cart" title="Your bill is empty" copy="Choose something delicious from the menu to get started." />}
          </div>
          <div className="bill-totals">
            <div><span>Subtotal</span><b>{formatCurrency(subtotal)}</b></div>
            <label className="bill-discount-row"><span>Discount</span><select aria-label="Bill discount" value={discountPercent} onChange={(event) => onUpdateDraft('discountPercent', Number(event.target.value))} disabled={isHeld}>{[0, 5, 10, 15, 20].map((rate) => <option key={rate} value={rate}>{rate}%</option>)}</select><b>− {formatCurrency(discountAmount)}</b></label>
            <div><span>Taxable amount</span><b>{formatCurrency(taxableSubtotal)}</b></div>
            <div><span>GST <small>(5%)</small></span><b>{formatCurrency(tax)}</b></div>
            <div className="bill-grand-total"><span>Total due</span><b>{formatCurrency(total)}</b></div>
            <label className="bill-guest-split"><span>Split bill evenly</span><select aria-label="Split bill between guests" value={guestCount} onChange={(event) => onUpdateDraft('guestCount', Number(event.target.value))} disabled={isHeld}><option value={1}>One bill</option>{[2, 3, 4].map((count) => <option value={count} key={count}>{count} guests</option>)}</select></label>
            {guestCount > 1 && <div className="guest-split-preview"><span>Per guest · before payment</span><b>{guestShares.map((share, index) => <span key={index}>Guest {index + 1} · {formatCurrency(share)}</span>)}</b></div>}
          </div>
          <div className="payment-method"><span>Payment method <small>Simulated only</small></span><div>{['Cash', 'UPI', 'Split', 'Card'].map((method) => <button className={paymentMethod === method ? 'payment-selected' : ''} key={method} onClick={() => setPaymentMethod(method)}>{method === 'Split' ? 'Split pay' : method}</button>)}<button disabled title="Due is not enabled in this demo">Due · unavailable</button></div></div>
          <button className="send-kot-button" disabled={!cartCount || isHeld || (orderType === 'Dine in' && !selectedTable)} onClick={onSendKot}>SEND KOT <span>{cartCount ? `· ${cartCount} ${cartCount === 1 ? 'item' : 'items'}` : ''}</span><Icon name="arrow" size={16} /></button>
          <button className="generate-bill-button" disabled={isHeld || (!cartCount && !orderCount && !activeOrderId)} onClick={onGenerate}>Generate bill <Icon name="arrow" size={16} /></button>
          <button className="hold-bill-button" disabled={!cartCount && !orderCount} onClick={onToggleHold}><Icon name={isHeld ? 'check' : 'clock'} size={14} />{isHeld ? 'Resume held bill' : 'Hold bill'}</button>
          {isHeld && <p className="held-bill-note" role="status">This draft is saved and paused. Resume it to make changes or bill the order.</p>}
          {notice && <p className="pos-notice" role="status">{notice}</p>}
          <p className="bill-demo-note"><Icon name="shield" size={13} /> Simulation only · KOTs stay on this device · no payment is processed</p>
        </aside>
      </div>
    </>
  )
}

function OrdersScreen({ orders, onAdvance, filter, setFilter, focusedOrder, onClearFocus, onNewBill }) {
  const filteredOrders = orders.filter((order) => filter === 'All orders' || order.status === filter)
  const counts = {
    'All orders': orders.length,
    Preparing: orders.filter((order) => order.status === 'Preparing').length,
    Ready: orders.filter((order) => order.status === 'Ready').length,
    Completed: orders.filter((order) => order.status === 'Completed').length,
  }
  return (
    <>
      <PageTitle eyebrow="SERVICE WORKSPACE" title="Order management" copy="Keep every dine-in and takeaway order moving through service." action={<button className="button-primary" onClick={onNewBill}><Icon name="plus" size={16} /> New order</button>} />
      <div className="orders-toolbar panel">
        <div className="order-filter-tabs" role="tablist" aria-label="Filter orders">
          {Object.keys(counts).map((item) => <button className={filter === item ? 'order-filter-active' : ''} key={item} role="tab" aria-selected={filter === item} onClick={() => { setFilter(item); onClearFocus() }}>{item}<span>{counts[item]}</span></button>)}
        </div>
        <span className="orders-sample-tag"><i /> SAMPLE SERVICE QUEUE</span>
      </div>
      {filteredOrders.length ? (
        <div className="orders-grid">
          {filteredOrders.map((order) => (
            <article className={`order-card panel${focusedOrder === order.id ? ' order-focused' : ''}`} key={order.id}>
              <div className="order-card-top"><div><span className="order-card-id">{order.id}</span><span className="order-card-time"><Icon name="clock" size={13} />{order.time}</span></div><StatusBadge status={order.status} /></div>
              <div className="order-card-meta"><span className="order-type-icon"><Icon name={order.type === 'Takeaway' || order.type === 'Parcel' ? 'phone' : 'tables'} size={16} /></span><div><b>{order.guest}</b><small>{order.type === 'Dine in' ? `Dine in · Table ${order.table}` : `${order.type === 'Takeaway' ? 'Parcel' : order.type}${order.parcelNumber ? ` ${order.parcelNumber}` : ' · Pickup'}`}</small></div><strong>{formatCurrency(order.total)}</strong></div>
              <div className="order-card-items">{order.items.map((item, index) => {
                const menuItem = menuItems.find((entry) => entry.id === item.menuItemId || entry.name === item.name)
                return <div key={`${item.id || item.name}-${index}`}><span>{item.quantity} × {item.name}{item.portion ? ` (${item.portion})` : ''}</span><i>{formatCurrency((item.price ?? menuItem?.price ?? 0) * item.quantity)}</i></div>
              })}</div>
              <div className="order-card-bottom"><span>{order.status === 'Completed' ? 'Order completed' : `Kitchen · ${order.status.toLowerCase()}`}</span>{order.status === 'Preparing' && <button className="order-action-button" onClick={() => onAdvance(order)}>Mark ready <Icon name="check" size={14} /></button>}{order.status === 'Ready' && <button className="order-action-button" onClick={() => onAdvance(order)}>Complete order <Icon name="check" size={14} /></button>}</div>
            </article>
          ))}
        </div>
      ) : <EmptyState icon="orders" title={`No ${filter.toLowerCase()} yet`} copy="New orders created in Billing will appear here." action={<button className="button-secondary" onClick={onNewBill}>Create an order</button>} />}
    </>
  )
}

function TablesScreen({ tables, orders, drafts, onStart, onRelease, onViewOrder, onClear, onViewKitchen, onAddTable }) {
  const [now, setNow] = useState(() => new Date())
  const availableCount = tables.filter((table) => table.status === 'Available').length
  const occupiedCount = tables.filter((table) => table.status === 'Occupied').length
  const reservedCount = tables.filter((table) => table.status === 'Reserved').length

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <PageTitle eyebrow="FLOOR PLAN · LIVE STATUS" title="Table management" copy="A clear view of your dining room, at a glance." action={<button className="button-primary" onClick={onAddTable}><Icon name="plus" size={16} /> Add table</button>} />
      <div className="table-summary-grid">
        <div className="table-summary-item"><span className="table-summary-dot dot-available" /><div><b>{availableCount}</b><span>Free</span></div></div>
        <div className="table-summary-item"><span className="table-summary-dot dot-occupied" /><div><b>{occupiedCount}</b><span>Occupied</span></div></div>
        <div className="table-summary-item"><span className="table-summary-dot dot-reserved" /><div><b>{reservedCount}</b><span>Reserved</span></div></div>
        <span className="table-summary-caption"><Icon name="clock" size={15} /> Updated just now</span>
      </div>
      {['Main hall', 'Courtyard'].map((section) => (
        <section className="table-section panel" key={section}>
          <div className="table-section-heading"><div><span className="panel-eyebrow">DINING AREA</span><h2>{section}</h2></div><span>{tables.filter((table) => table.section === section).length} tables</span></div>
          <div className="restaurant-table-grid">
            {tables.filter((table) => table.section === section).map((table) => (
              <article className={`restaurant-table table-${table.status.toLowerCase()}`} key={table.id}>
                {(() => {
                  const order = orders.find((item) => item.id === table.orderId)
                  const draft = drafts[`table:${table.id}`]
                  const orderSubtotal = (order?.items || []).reduce((sum, item) => {
                    const menuItem = menuItems.find((entry) => entry.id === item.menuItemId || entry.name === item.name)
                    const unitPrice = Number.isFinite(item.price) ? item.price : menuItem ? portionPrice(menuItem, item.portion || 'Full') : 0
                    return sum + unitPrice * item.quantity
                  }, 0)
                  const subtotal = orderSubtotal + sumOrderItems(draft?.items || [])
                  const discount = Math.round(subtotal * Number(draft?.discountPercent || 0) / 100)
                  const taxableSubtotal = Math.max(0, subtotal - discount)
                  const computedAmount = taxableSubtotal + Math.round(taxableSubtotal * 0.05)
                  const amount = order?.billTotal !== undefined && !draft?.items?.length ? order.billTotal : computedAmount
                  const startedAt = table.startedAt || order?.createdAt
                  const elapsedMinutes = startedAt ? Math.max(0, Math.floor((now.getTime() - new Date(startedAt).getTime()) / 60000)) : null
                  return <>
                    <div className="restaurant-table-top"><span>TABLE {table.id}</span><StatusBadge status={table.status === 'Available' ? 'Free' : table.status === 'Occupied' ? (table.serviceState || 'Running') : table.status} /></div>
                    <div className="restaurant-table-graphic"><span className="chair chair-top" /><span className="chair chair-right" /><span className="chair chair-bottom" /><span className="chair chair-left" /><span className="tabletop"><Icon name="tables" size={19} /></span></div>
                    <div className="restaurant-table-footer"><span><Icon name="user" size={14} /> {table.seats} seats</span>{table.status === 'Occupied' ? <b>{table.orderId || 'Draft order'}</b> : <span>{table.status === 'Reserved' ? 'Guest expected' : 'Ready to seat'}</span>}</div>
                    {table.status === 'Occupied' && <div className="table-live-details"><span><small>ORDER AMOUNT</small><b>{formatCurrency(amount)}</b></span><span><small>ELAPSED</small><b>{elapsedMinutes === null ? '—' : `${elapsedMinutes} min`}</b></span></div>}
                {table.status === 'Available' && <button className="table-action" onClick={() => onStart(table)}>Start order <Icon name="arrow" size={14} /></button>}
                {table.status === 'Occupied' && <div className="table-actions">
                  <button className="table-action" onClick={() => onStart(table)}>{table.orderId ? 'Continue order' : 'Continue draft'} <Icon name="arrow" size={14} /></button>
                  {table.orderId && <button className="table-action table-kitchen-action" onClick={() => onViewKitchen(table)}>View KOTs <Icon name="orders" size={14} /></button>}
                  {table.orderId && <button className="table-action table-kitchen-action" onClick={() => onViewOrder(table)}>View order <Icon name="arrow" size={14} /></button>}
                  {!table.orderId && <button className="table-action table-release-action" onClick={() => onClear(table)}>Release draft <Icon name="close" size={14} /></button>}
                  {table.serviceState === 'Paid' && <button className="table-action table-release-action" onClick={() => onClear(table)}>Clear table <Icon name="check" size={14} /></button>}
                </div>}
                {table.status === 'Reserved' && <button className="table-action table-release-action" onClick={() => onRelease(table)}>Release table <Icon name="check" size={14} /></button>}
                  </>
                })()}
              </article>
            ))}
          </div>
        </section>
      ))}
      <div className="floor-note"><Icon name="spark" size={17} /><span>Start an order from an available table. Completing a demo order updates its table status automatically.</span></div>
    </>
  )
}

function KitchenDisplayScreen({ kots, orders, filter, setFilter, onStatusChange, onCancelItem, onMoveRequest, onDuplicate, onOpenBilling }) {
  const [now, setNow] = useState(() => new Date())
  const filteredKots = kots.filter((kot) => filter === 'All' || kot.type === filter)
  const activeCount = kots.filter((kot) => kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0) && !orders.find((order) => order.id === kot.orderId)?.paid).length
  const kindLabels = { original: 'ORIGINAL', changed: 'ORDER CHANGED', moved: 'MOVED', duplicate: 'DUPLICATE' }

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <PageTitle eyebrow="KITCHEN DISPLAY SYSTEM · The Santosa, Anmod" title="Kitchen tickets" copy="Track every dine-in and parcel KOT for The Santosa, Anmod from one live sample queue." action={<span className="screen-live-label"><i /> {activeCount} ACTIVE KOT{activeCount === 1 ? '' : 'S'}</span>} />
      <div className="kot-toolbar panel">
        <div className="kot-filter-tabs" role="tablist" aria-label="Filter kitchen tickets">
          {['All', 'Dine in', 'Parcel'].map((item) => (
            <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? 'kot-filter-active' : ''} onClick={() => setFilter(item)}>
              {item === 'All' ? 'All KOTs' : item === 'Dine in' ? 'Dine-in' : 'Parcel'} <span>{item === 'All' ? kots.length : kots.filter((kot) => kot.type === item).length}</span>
            </button>
          ))}
        </div>
        <span className="kot-demo-tag">LOCAL DEMO QUEUE</span>
      </div>
      {filteredKots.length ? (
        <div className="kot-grid">
          {filteredKots.map((kot) => {
            const activeItems = kot.items.filter((item) => item.activeQuantity > 0)
            const order = orders.find((item) => item.id === kot.orderId)
            const isActive = kot.kind !== 'duplicate' && activeItems.length > 0
            const status = isActive ? kot.status : kot.kind === 'duplicate' ? 'Duplicate' : kot.items.some((item) => item.cancelledQuantity > 0) ? 'Cancelled' : 'Moved'
            const elapsedMinutes = Math.max(0, Math.floor((now.getTime() - new Date(kot.createdAt).getTime()) / 60000))
            return (
              <article className={`kot-card panel kot-kind-${kot.kind}${isActive ? '' : ' kot-card-inactive'}`} key={kot.id}>
                <div className="kot-card-top">
                  <div><span className="kot-restaurant-name">The Santosa, Anmod</span><span className={`kot-kind-badge kot-kind-badge-${kot.kind}`}>{kindLabels[kot.kind] || 'KOT'}</span></div>
                  <StatusBadge status={status} />
                </div>
                <div className="kot-card-heading">
                  <div><h2>{kot.id}</h2><span>{kot.type === 'Dine in' ? `Table ${kot.table}` : `PARCEL · Parcel ${kot.parcelNumber}`}</span></div>
                  <div className="kot-elapsed">{elapsedMinutes} min<span>{new Intl.DateTimeFormat('en-IN', { day: '2-digit', month: 'short' }).format(new Date(kot.createdAt))} · {new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date(kot.createdAt))}</span></div>
                </div>
                <div className="kot-order-reference">Order {kot.orderId}{order?.guest && order.guest !== `Table ${kot.table}` ? ` · ${order.guest}` : ''}</div>
                {kot.type === 'Dine in' && (kot.steward || kot.captain) && <div className="kot-staff-line">{kot.steward && <span>Steward · {kot.steward}</span>}{kot.captain && <span>Captain · {kot.captain}</span>}</div>}
                <div className="kot-items">
                  {kot.items.map((item) => (
                    <div className={`kot-item${item.activeQuantity <= 0 ? ' kot-item-inactive' : ''}`} key={item.id}>
                      <div className="kot-item-copy">
                        <b>{item.name} <span>({item.portion})</span></b>
                        <span className="kot-item-quantity">{item.activeQuantity > 0 ? `${item.activeQuantity} active` : ''}</span>
                        {item.notes && <small className="kot-prep-note">Note · {item.notes}</small>}
                        {item.cancelledQuantity > 0 && <small className="kot-cancel-mark">CANCEL × {item.cancelledQuantity}</small>}
                        {item.movedQuantity > 0 && <small className="kot-moved-mark">MOVED × {item.movedQuantity}</small>}
                      </div>
                      <b className="kot-quantity">× {item.quantity}</b>
                      {isActive && !order?.paid && item.activeQuantity > 0 && <>
                        <button className="kot-item-action kot-cancel-action" onClick={() => onCancelItem(kot.id, item.id)} aria-label={`Cancel ${item.name} from ${kot.id}`}>Cancel</button>
                        {kot.type === 'Dine in' && <button className="kot-item-action" onClick={() => onMoveRequest(kot.id, item.id)} aria-label={`Move ${item.name} from ${kot.id}`}>Move item</button>}
                      </>}
                    </div>
                  ))}
                </div>
                {isActive ? (
                  <>
                    <div className="kot-status-controls" role="group" aria-label={`Status for ${kot.id}`}>
                      {['Pending', 'Preparing', 'Ready'].map((nextStatus) => (
                        <button key={nextStatus} className={kot.status === nextStatus ? 'kot-status-selected' : ''} disabled={kot.status === nextStatus} onClick={() => onStatusChange(kot.id, nextStatus)}>
                          {nextStatus === 'Ready' && kot.type === 'Parcel' ? 'Ready for pickup' : nextStatus}
                        </button>
                      ))}
                    </div>
                    <div className="kot-card-actions">
                      <button onClick={() => onDuplicate(kot.id)}>Duplicate KOT</button>
                      {kot.type === 'Dine in' && !order?.paid && <button onClick={() => onMoveRequest(kot.id, null)}>Move KOT</button>}
                    </div>
                  </>
                ) : <div className="kot-inactive-note">{kot.kind === 'duplicate' ? 'Reference copy only · not an active kitchen order.' : 'This slip is kept for the kitchen change history.'}</div>}
              </article>
            )
          })}
        </div>
      ) : <EmptyState icon="orders" title={`No ${filter === 'All' ? '' : `${filter.toLowerCase()} `}KOTs yet`} copy="Send a KOT from Billing to add an order to the kitchen queue." action={<button className="button-secondary" onClick={onOpenBilling}>Open billing</button>} />}
    </>
  )
}

function MoveKotDialog({ kot, itemId, tables, onClose, onConfirm }) {
  const [targetTable, setTargetTable] = useState('')
  const destinations = tables.filter((table) => table.id !== kot.table && (table.status === 'Available' || (table.status === 'Occupied' && table.serviceState !== 'Paid')))
  const selectedItem = itemId ? kot.items.find((item) => item.id === itemId) : null

  return (
    <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="move-kot-modal" role="dialog" aria-modal="true" aria-labelledby="move-kot-title">
        <div className="receipt-modal-heading"><div><span className="panel-eyebrow">MOVE KOT / ITEMS</span><h2 id="move-kot-title">Move from Table {kot.table}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close move dialog"><Icon name="close" size={18} /></button></div>
        <p>{selectedItem ? `Move ${selectedItem.activeQuantity} × ${selectedItem.name} (${selectedItem.portion}).` : `Move all active items from ${kot.id}.`}</p>
        <label className="move-table-label">Destination table
          <select aria-label="Destination table" value={targetTable} onChange={(event) => setTargetTable(event.target.value)}>
            <option value="">Choose a table</option>
            {destinations.map((table) => <option value={table.id} key={table.id}>Table {table.id}{table.orderId ? ` · add to ${table.orderId}` : ' · available'}</option>)}
          </select>
        </label>
        {!destinations.length && <p className="move-no-destinations">No other available tables. Release a table or finish its bill first.</p>}
        <div className="receipt-modal-actions"><button className="button-secondary" onClick={onClose}>Cancel</button><button className="button-primary" disabled={!targetTable} onClick={() => onConfirm(targetTable)}>Create MOVED KOT</button></div>
      </section>
    </div>
  )
}

function InventoryScreen({ inventory, onAdjust, filter, setFilter }) {
  const lowCount = inventory.filter((item) => item.quantity <= item.par).length
  const shownInventory = inventory.filter((item) => filter === 'All stock' || item.quantity <= item.par)
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0)
  const recipeRows = menuItems.map((menuItem) => {
    const ingredients = Object.entries(menuItem.recipe).map(([id, amount]) => {
      const stockItem = inventory.find((item) => item.id === id)
      if (!stockItem) return null
      const unit = stockItem.unit === 'kg' ? 'g' : stockItem.unit === 'L' ? 'ml' : stockItem.unit
      const quantity = stockItem.unit === 'kg' || stockItem.unit === 'L' ? Math.round(amount * 1000) : amount
      return `${stockItem.name} ${formatQuantity(quantity)} ${unit}`
    }).filter(Boolean)
    const cost = Object.entries(menuItem.recipe).reduce((sum, [id, amount]) => {
      const stockItem = inventory.find((item) => item.id === id)
      return sum + (stockItem ? amount * stockItem.cost : 0)
    }, 0)
    return { ...menuItem, ingredients, cost, foodCostPercent: menuItem.price ? Math.round(cost / menuItem.price * 100) : 0 }
  })
  return (
    <>
      <PageTitle eyebrow="STOCKROOM · SAMPLE COUNTS" title="Inventory" copy="Track ingredients, catch low stock early, and make quick demo adjustments." action={<button className="button-primary" onClick={() => setFilter(filter === 'Low stock' ? 'All stock' : 'Low stock')}><Icon name={filter === 'Low stock' ? 'overview' : 'warning'} size={16} />{filter === 'Low stock' ? 'View all stock' : `Low stock · ${lowCount}`}</button>} />
      <div className="inventory-metrics">
        <MetricCard label="Tracked ingredients" value={String(inventory.length).padStart(2, '0')} change="Across" note="7 categories" icon="inventory" tone="orange" />
        <MetricCard label="Need attention" value={String(lowCount).padStart(2, '0')} change={lowCount ? 'Restock' : 'All clear'} note="below par level" icon="warning" tone="gold" />
        <MetricCard label="Sample stock value" value={formatCurrency(totalValue)} change="Estimate" note="for demo only" icon="reports" tone="green" />
      </div>
      <section className="inventory-panel panel">
        <div className="inventory-table-heading"><div><span className="panel-eyebrow">The Santosa, Anmod · Stockroom</span><h2>{filter === 'Low stock' ? 'Items to replenish' : 'Ingredient levels'}</h2></div><span className="inventory-table-count">{shownInventory.length} ingredients</span></div>
        <div className="inventory-table-wrap">
          <table className="inventory-table">
            <thead><tr><th>INGREDIENT</th><th>CATEGORY</th><th>ON HAND</th><th>PAR LEVEL</th><th>STOCK STATUS</th><th>DEMO ADJUSTMENT</th></tr></thead>
            <tbody>{shownInventory.map((item) => {
              const isLow = item.quantity <= item.par
              const step = item.unit === 'kg' || item.unit === 'L' ? 0.5 : 1
              return <tr key={item.id}><td><div className="inventory-product"><span className={`inventory-item-mark mark-${item.category.toLowerCase()}`}><Icon name={item.category === 'Produce' ? 'spark' : 'inventory'} size={16} /></span><b>{item.name}</b></div></td><td><span className="inventory-category">{item.category}</span></td><td><b className="inventory-quantity">{formatQuantity(item.quantity)} <small>{item.unit}</small></b></td><td>{formatQuantity(item.par)} <small className="unit-muted">{item.unit}</small></td><td><span className={`inventory-status${isLow ? ' inventory-low' : ''}`}><i />{isLow ? 'Low stock' : 'In stock'}</span></td><td><div className="inventory-actions"><button onClick={() => onAdjust(item.id, step)} aria-label={`Restock ${item.name} by ${step} ${item.unit}`}><Icon name="plus" size={13} /> Restock</button><button onClick={() => onAdjust(item.id, -step)} disabled={item.quantity < step} aria-label={`Use ${step} ${item.unit} of ${item.name}`}><Icon name="minus" size={13} /> Adjust</button></div></td></tr>
            })}</tbody>
          </table>
          {!shownInventory.length && <div className="inventory-no-results">No ingredients match this filter.</div>}
        </div>
        <div className="inventory-table-footer"><span><Icon name="spark" size={15} /> Demo stock adjustments update menu availability locally.</span><span>Last checked just now</span></div>
      </section>
      <section className="panel recipe-cost-panel">
        <div className="panel-heading"><div><span className="panel-eyebrow">RECIPE-TO-STOCK · FULL PORTION</span><h2>Recipe use & dish cost</h2></div><span className="orders-sample-tag"><i /> SAMPLE CALCULATION</span></div>
        <div className="recipe-cost-list">
          {recipeRows.map((item) => <article className="recipe-cost-row" key={item.id}>
            <div><b>{item.name}</b><small>{item.ingredients.join(' · ')}</small></div>
            <span><small>INGREDIENT COST</small><b>{formatCurrency(item.cost)}</b></span>
            <span><small>FOOD COST</small><b>{item.foodCostPercent}%</b></span>
          </article>)}
        </div>
        <p className="recipe-cost-note">Estimated from the sample recipe quantities and current sample ingredient costs. Actual dish costs are not connected to a live recipe or purchase ledger.</p>
      </section>
    </>
  )
}

function AIAssistantScreen({ dailySales, dailyOrderCount, inventory, onNavigate }) {
  const [activeQuestion, setActiveQuestion] = useState('sales')
  const chicken = inventory.find((item) => item.id === 'chicken')
  const chickenOnHand = chicken?.quantity || 0
  const suggestedChickenOrder = Math.max(0, 18 - chickenOnHand)
  const lowStock = inventory.filter((item) => item.quantity <= item.par)
  const questions = [
    { id: 'sales', label: 'How did we do today?' },
    { id: 'stock', label: 'What needs attention?' },
    { id: 'shopping', label: 'What should we buy for tomorrow?' },
  ]

  return (
    <>
      <PageTitle eyebrow="MACH · AI ASSISTANT · INTERACTIVE PREVIEW" title="Ask your restaurant data" copy="Explore sample business answers using the demo workspace. No AI service or live restaurant data is connected." action={<span className="screen-live-label"><i /> SAMPLE RESPONSES</span>} />
      <div className="assistant-demo-layout">
        <section className="panel assistant-chat-panel">
          <div className="assistant-chat-heading"><span className="assistant-avatar"><Icon name="spark" size={17} /></span><div><b>MACH</b><small>Interactive Preview · sample data only</small></div><span className="assistant-preview-tag">PREVIEW</span></div>
          <div className="assistant-message assistant-message-user"><span>{questions.find((item) => item.id === activeQuestion)?.label}</span></div>
          <div className="assistant-message assistant-message-bot">
            {activeQuestion === 'sales' && <><b>Today's sample snapshot</b><p>Sales are {formatCurrency(dailySales)} across {dailyOrderCount} sample orders, averaging {formatCurrency(dailySales / Math.max(1, dailyOrderCount))} per order.</p><small>These figures are local demo values, not live sales.</small></>}
            {activeQuestion === 'stock' && <><b>Stock to review</b><p>{lowStock.length ? lowStock.map((item) => `${item.name} (${formatQuantity(item.quantity)} ${item.unit})`).join(', ') : 'No ingredients are currently below their sample reorder points.'}</p><small>Check the sample stock list before making a purchase decision.</small></>}
            {activeQuestion === 'shopping' && <><b>Illustrative chicken shopping note</b><p>Tomorrow's target is 18 kg (17 kg expected use plus a 1 kg buffer). Current sample stock is {formatQuantity(chickenOnHand)} kg, so the suggested purchase is {formatQuantity(suggestedChickenOrder)} kg.</p><small>Suggestion only · no vendor order is created or sent.</small></>}
          </div>
          <div className="assistant-suggestions"><span>TRY A SAMPLE QUESTION</span>{questions.map((question) => <button key={question.id} className={activeQuestion === question.id ? 'assistant-question-active' : ''} onClick={() => setActiveQuestion(question.id)}>{question.label}<Icon name="arrow" size={14} /></button>)}</div>
          <div className="assistant-safety-note"><Icon name="shield" size={15} /><span>The assistant reads, analyses and suggests. It does not independently modify bills, stock or money.</span></div>
        </section>
        <aside className="assistant-insight-column">
          <section className="panel assistant-evening-card">
            <span className="panel-eyebrow">EVENING BUSINESS NOTE · SAMPLE</span><h2>A quick close-of-day view</h2>
            <ol>
              <li><b>Sales</b><span>{formatCurrency(dailySales)} across {dailyOrderCount} sample orders.</span></li>
              <li><b>Cash check</b><span>No shortage is recorded in this illustrative view.</span></li>
              <li><b>Stock</b><span>{lowStock.length ? `${lowStock.length} ingredient${lowStock.length === 1 ? '' : 's'} below sample par.` : 'No sample low-stock alerts.'}</span></li>
              <li><b>Attention</b><span>{lowStock.slice(0, 2).map((item) => item.name).join(', ') || 'Review closing counts before next service.'}</span></li>
              <li><b>Next step</b><span>Review stock and count cash before closing.</span></li>
            </ol>
          </section>
          <section className="panel assistant-shopping-card">
            <span className="panel-eyebrow">TOMORROW'S SHOPPING NOTE</span><h2>Chicken · {formatQuantity(suggestedChickenOrder)} kg suggested</h2>
            <div className="assistant-shopping-metrics"><span><small>Expected use</small><b>17 kg</b></span><span><small>Current stock</small><b>{formatQuantity(chickenOnHand)} kg</b></span><span><small>Target + buffer</small><b>18 kg</b></span></div>
            <button className="text-button" onClick={() => onNavigate('inventory')}>Review sample inventory <Icon name="arrow" size={14} /></button>
            <small className="assistant-add-on-note">Paid add-on · Starting at ₹49/month. This is not a live AI integration.</small>
          </section>
        </aside>
      </div>
    </>
  )
}

function StaffSettingsScreen({ role, onRoleChange }) {
  const capabilities = [
    { id: 'overview', label: 'Business overview' },
    { id: 'billing', label: 'Billing & payments' },
    { id: 'orders', label: 'Order management' },
    { id: 'tables', label: 'Table management' },
    { id: 'kitchen', label: 'Kitchen display' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'reports', label: 'Sales reports' },
    { id: 'ai-assistant', label: 'AI Assistant preview' },
    { id: 'staff-settings', label: 'Staff & settings' },
  ]

  return (
    <>
      <PageTitle eyebrow="STAFF & SETTINGS · ROLE DEMONSTRATION" title="Staff access" copy="Switch between example roles to preview how navigation changes. This is a local UI demonstration, not authentication or a security boundary." action={<span className="screen-live-label"><i /> LOCAL ROLE PREVIEW</span>} />
      <div className="staff-role-grid">
        {Object.keys(roleProfiles).map((roleName) => <article className={`panel staff-role-card${role === roleName ? ' staff-role-current' : ''}`} key={roleName}>
          <span className="staff-role-avatar">{roleProfiles[roleName].initials}</span><div><span className="panel-eyebrow">{roleName === 'Owner' ? 'OWNER' : 'STAFF ROLE'}</span><h2>{roleName}</h2><p>{roleProfiles[roleName].name}</p></div>
          <button className={role === roleName ? 'button-secondary' : 'button-primary'} disabled={role === roleName} onClick={() => onRoleChange(roleName)}>{role === roleName ? 'Current preview' : 'Preview this role'}</button>
        </article>)}
      </div>
      <section className="panel staff-access-panel">
        <div className="panel-heading"><div><span className="panel-eyebrow">NAVIGATION ACCESS PREVIEW</span><h2>Role capability matrix</h2></div><span className="orders-sample-tag"><i /> DEMO ONLY</span></div>
        <div className="staff-access-table-wrap"><table className="staff-access-table"><thead><tr><th>MODULE</th>{Object.keys(roleProfiles).map((item) => <th key={item}>{item.toUpperCase()}</th>)}</tr></thead><tbody>{capabilities.map((capability) => <tr key={capability.id}><th>{capability.label}</th>{Object.keys(roleProfiles).map((roleName) => <td key={roleName}>{roleScreens[roleName].includes(capability.id) ? <span className="staff-access-yes" aria-label={`${roleName} can see ${capability.label}`}><Icon name="check" size={14} /></span> : <span className="staff-access-no" aria-label={`${roleName} cannot see ${capability.label}`}>—</span>}</td>)}</tr>)}</tbody></table></div>
        <p>Access is represented by visible demo navigation only. No user accounts, login checks or backend permission enforcement are connected.</p>
      </section>
    </>
  )
}

function ReportsScreen({ dailySales, dailyOrderCount, range, setRange, onExport }) {
  const reportConfig = {
    Today: { values: [2900, 5100, 3600, 7400, 5900, 11300, Math.max(8400, dailySales - 44600)], labels: ['10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'], sales: dailySales, orders: dailyOrderCount, average: dailySales / dailyOrderCount, title: 'Hourly sales' },
    '7 days': { values: [32500, 38900, 36100, 44200, 40500, 51800, 48620 + (dailySales - 48620)], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], sales: 292620 + dailySales - 48620, orders: 824 + dailyOrderCount - 124, average: 355, title: 'Sales by day' },
    '30 days': { values: [298000, 324000, 301000, 347000, 381000, 359000, 412000], labels: ['1–4', '5–8', '9–12', '13–16', '17–20', '21–24', '25–30'], sales: 2422000 + dailySales - 48620, orders: 6810 + dailyOrderCount - 124, average: 356, title: 'Sales by period' },
  }
  const report = reportConfig[range]
  const gstTotal = Math.round(report.sales * 0.05 / 1.05)
  const netSales = report.sales - gstTotal
  const expensesTotal = Math.round(netSales * 0.17)
  const sampleExpenses = [
    { label: 'Gas & utilities', amount: Math.round(expensesTotal * 0.24) },
    { label: 'Ingredients & supplies', amount: Math.round(expensesTotal * 0.43) },
    { label: 'Staff & other', amount: expensesTotal - Math.round(expensesTotal * 0.67) },
  ]
  const samplePayments = [
    { label: 'Cash', amount: Math.round(report.sales * 0.56) },
    { label: 'UPI', amount: Math.round(report.sales * 0.32) },
    { label: 'Card', amount: Math.round(report.sales * 0.07) },
    { label: 'Split', amount: report.sales - Math.round(report.sales * 0.95) },
  ]
  const dineInSales = Math.round(report.sales * 0.72)
  const summary = {
    taxableSales: netSales,
    cgst: Math.round(gstTotal / 2),
    sgst: gstTotal - Math.round(gstTotal / 2),
    expenses: expensesTotal,
    profit: netSales - expensesTotal,
    expensesBreakdown: sampleExpenses,
    paymentBreakdown: samplePayments,
    orderBreakdown: [
      { label: 'Dine-in', orders: Math.round(report.orders * 0.68), sales: dineInSales },
      { label: 'Parcel', orders: report.orders - Math.round(report.orders * 0.68), sales: report.sales - dineInSales },
    ],
  }
  const topItems = [
    { name: 'Chicken Dum Biryani', count: range === 'Today' ? 42 : range === '7 days' ? 286 : 1194, share: 86 },
    { name: 'Mutton Dum Biryani', count: range === 'Today' ? 31 : range === '7 days' ? 218 : 902, share: 68 },
    { name: 'Chicken 65', count: range === 'Today' ? 24 : range === '7 days' ? 176 : 731, share: 55 },
    { name: 'The Santosa Special Biryani', count: range === 'Today' ? 19 : range === '7 days' ? 141 : 608, share: 42 },
  ]
  return (
    <>
      <PageTitle eyebrow="The Santosa, Anmod · Business insights · Sample data" title="Sales reports" copy="Understand sales, order volume, and the menu favourites bringing guests back." action={<button className="button-secondary" onClick={() => onExport(report, range, summary)}><Icon name="download" size={16} /> Export CSV</button>} />
      <div className="report-range-bar panel"><div className="report-range-tabs" role="tablist" aria-label="Report period">{reportRanges.map((item) => <button key={item} className={range === item ? 'report-range-active' : ''} role="tab" aria-selected={range === item} onClick={() => setRange(item)}>{item}</button>)}</div><span><Icon name="clock" size={14} /> Updated just now · Sample data</span></div>
      <div className="metric-grid report-metric-grid">
        <MetricCard label={`${range} sales`} value={formatCurrency(report.sales)} change="+12.8%" note="vs. prior period" icon="reports" tone="orange" />
        <MetricCard label="Orders fulfilled" value={report.orders.toLocaleString('en-IN')} change="+8.4%" note="vs. prior period" icon="billing" tone="green" />
        <MetricCard label="Average order value" value={formatCurrency(report.average)} change="+4.2%" note="vs. prior period" icon="cart" tone="gold" />
        <MetricCard label="Menu items sold" value={range === 'Today' ? '326' : range === '7 days' ? '2,184' : '9,320'} change="Top seller" note="Chicken Dum Biryani" icon="billing" tone="plum" />
      </div>
      <div className="reports-content-grid">
        <section className="panel report-chart-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">REVENUE TREND</span><h2>{report.title}</h2></div><span className="report-total">{formatCurrency(report.sales)}</span></div>
          <div className="report-chart-legend"><span><i /> {range} revenue</span><span>Compared to prior period <b>↑ 12.8%</b></span></div>
          <SalesChart values={report.values} labels={report.labels} />
          <div className="report-chart-bottom"><span>Figures shown are for demonstration purposes.</span><span>Currency · INR</span></div>
        </section>
        <section className="panel top-items-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">MENU PERFORMANCE</span><h2>Top selling items</h2></div><Icon name="billing" size={18} /></div>
          <div className="top-item-list">{topItems.map((item, index) => <div className="top-item-row" key={item.name}><span className="top-item-rank">0{index + 1}</span><div className="top-item-copy"><b>{item.name}</b><span className="top-item-meter"><i style={{ width: `${item.share}%` }} /></span></div><span className="top-item-count">{item.count}<small>sold</small></span></div>)}</div>
          <div className="top-items-note"><Icon name="spark" size={14} /> Biryani leads this period&apos;s sales mix.</div>
        </section>
      </div>
      <div className="report-breakdown-grid">
        <section className="panel report-breakdown-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">PAYMENT BREAKDOWN</span><h2>Sales by method</h2></div><Icon name="billing" size={18} /></div>
          {summary.paymentBreakdown.map((item) => <div className="report-breakdown-row" key={item.label}><span>{item.label}</span><b>{formatCurrency(item.amount)}</b></div>)}
        </section>
        <section className="panel report-breakdown-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">ORDER TYPES</span><h2>Dine-in vs parcel</h2></div><Icon name="tables" size={18} /></div>
          {summary.orderBreakdown.map((item) => <div className="report-breakdown-row" key={item.label}><span>{item.label}<small>{item.orders} orders</small></span><b>{formatCurrency(item.sales)}</b></div>)}
        </section>
        <section className="panel report-breakdown-panel report-finance-panel">
          <div className="panel-heading"><div><span className="panel-eyebrow">GST & OPERATING SUMMARY</span><h2>Illustrative totals</h2></div><Icon name="reports" size={18} /></div>
          <div className="report-breakdown-row"><span>CGST · sample 2.5%</span><b>{formatCurrency(summary.cgst)}</b></div>
          <div className="report-breakdown-row"><span>SGST · sample 2.5%</span><b>{formatCurrency(summary.sgst)}</b></div>
          {summary.expensesBreakdown.map((item) => <div className="report-breakdown-row" key={item.label}><span>{item.label}</span><b>{formatCurrency(item.amount)}</b></div>)}
          <div className="report-breakdown-row"><span>Estimated profit · before tax</span><b>{formatCurrency(summary.profit)}</b></div>
          <p>Sample expense estimates only. Not accounting or tax records.</p>
        </section>
      </div>
    </>
  )
}

function SimulatedUpiQr() {
  const cells = Array.from({ length: 21 * 21 }, (_, index) => {
    const row = Math.floor(index / 21)
    const column = index % 21
    const finderAt = (top, left) => {
      const vertical = row - top
      const horizontal = column - left
      if (vertical < 0 || vertical > 6 || horizontal < 0 || horizontal > 6) return null
      return vertical === 0 || vertical === 6 || horizontal === 0 || horizontal === 6
        || (vertical >= 2 && vertical <= 4 && horizontal >= 2 && horizontal <= 4)
    }
    const finder = finderAt(0, 0) ?? finderAt(0, 14) ?? finderAt(14, 0)
    return finder ?? ((row * 7 + column * 3 + row * column) % 11 < 5)
  })

  return (
    <div className="simulated-upi-qr" role="img" aria-label="Illustrative non-scannable UPI demo code">
      {cells.map((isDark, index) => <i className={isDark ? 'qr-dark' : ''} key={index} />)}
      <span>DEMO</span>
    </div>
  )
}

function BillModal({ receipt, onComplete, onClose, completed, paymentMethod, setPaymentMethod, paymentResult }) {
  const [cashReceived, setCashReceived] = useState('')
  const [splitCash, setSplitCash] = useState('')
  const [splitUpi, setSplitUpi] = useState('')

  if (!receipt) return null
  const cashAmount = Number(cashReceived)
  const splitCashAmount = Number(splitCash) || 0
  const splitUpiAmount = Number(splitUpi) || 0
  const splitPaidAmount = splitCashAmount + splitUpiAmount
  const splitRemaining = Math.round((receipt.total - splitPaidAmount) * 100) / 100
  const guestShares = splitAmountAcrossGuests(receipt.total, receipt.guestCount || 1)
  const cashIsValid = cashReceived !== '' && Number.isFinite(cashAmount) && cashAmount >= receipt.total
  const splitIsValid = Math.round(splitPaidAmount * 100) === Math.round(receipt.total * 100)
  const paymentStatus = paymentResult?.status || receipt.paymentStatus || 'PENDING'

  const confirmPayment = (details = {}) => onComplete({ method: paymentMethod, ...details })

  return (
    <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <div className="receipt-modal-heading"><div><span className="panel-eyebrow">The Santosa, Anmod</span><h2 id="receipt-title">{completed ? 'Payment recorded' : 'Review bill & collect payment'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close bill"><Icon name="close" size={18} /></button></div>
        {completed && <div className="receipt-success"><span><Icon name="check" size={16} /></span> Simulated {paymentResult.method} payment recorded. No funds were transferred.</div>}
        {!completed && <section className="payment-workflow">
          <div className="payment-workflow-heading"><div><span className="panel-eyebrow">PAYMENT · DEMO ONLY</span><h3>Choose a payment method</h3></div><span className="payment-status-pending">PENDING</span></div>
          <div className="payment-method-tabs" role="group" aria-label="Payment method">
            {['Cash', 'UPI', 'Split', 'Card'].map((method) => <button key={method} className={paymentMethod === method ? 'payment-method-active' : ''} onClick={() => setPaymentMethod(method)}>{method === 'Split' ? 'Split payment' : method}</button>)}<button disabled title="Due is not enabled in this demo">Due · unavailable</button>
          </div>
          {paymentMethod === 'Cash' && <div className="cash-payment-panel">
            <label>Cash received<input type="number" min="0" step="1" value={cashReceived} onChange={(event) => setCashReceived(event.target.value)} placeholder="Enter amount received" /></label>
            <div className={`payment-balance${cashReceived !== '' && cashAmount < receipt.total ? ' payment-balance-due' : ''}`}><span>{cashIsValid ? 'Change to return' : 'Amount remaining'}</span><b>{formatCurrency(cashIsValid ? cashAmount - receipt.total : Math.max(0, receipt.total - (Number.isFinite(cashAmount) ? cashAmount : 0)))}</b></div>
            <button className="button-primary payment-confirm-button" disabled={!cashIsValid} onClick={() => confirmPayment({ cashReceived: cashAmount, change: cashAmount - receipt.total })}>Record cash payment</button>
          </div>}
          {paymentMethod === 'UPI' && <div className="upi-payment-panel">
            <SimulatedUpiQr />
            <div><b>Simulated UPI payment</b><span>The Santosa, Anmod · demo@thesantosa</span><small>This illustrative code is not scannable and will not request money.</small></div>
            <button className="button-primary payment-confirm-button" onClick={() => confirmPayment({ upiAmount: receipt.total })}>Confirm simulated UPI payment</button>
          </div>}
          {paymentMethod === 'Split' && <div className="split-payment-panel">
            <label>Cash amount<input type="number" min="0" step="1" value={splitCash} onChange={(event) => setSplitCash(event.target.value)} placeholder="₹0" /></label>
            <label>UPI amount<input type="number" min="0" step="1" value={splitUpi} onChange={(event) => setSplitUpi(event.target.value)} placeholder="₹0" /></label>
            <div className={`payment-balance${splitRemaining !== 0 ? ' payment-balance-due' : ''}`}><span>{splitRemaining > 0 ? 'Remaining balance' : splitRemaining < 0 ? 'Over the bill total' : 'Payment status'}</span><b>{splitRemaining === 0 ? 'PAID · ₹0' : formatCurrency(Math.abs(splitRemaining))}</b></div>
            <button className="button-primary payment-confirm-button" disabled={!splitIsValid} onClick={() => confirmPayment({ cashAmount: splitCashAmount, upiAmount: splitUpiAmount })}>Confirm split payment</button>
          </div>}
          {paymentMethod === 'Card' && <div className="card-payment-panel"><Icon name="shield" size={20} /><p>Simulate a successful card payment for <b>{formatCurrency(receipt.total)}</b>. No card details are collected.</p><button className="button-primary payment-confirm-button" onClick={() => confirmPayment()}>Confirm simulated card payment</button></div>}
        </section>}
        <div className="receipt-paper">
          <div className="receipt-brand"><div><b>The Santosa, Anmod</b><small>Restaurant POS Demo</small></div></div>
          <div className="receipt-meta"><span>Bill <b>{receipt.id}</b></span><span>{receipt.date}</span></div>
          <div className="receipt-meta"><span>{receipt.orderType === 'Dine in' ? `Dine-in · Table ${receipt.table}` : `Parcel ${receipt.parcelNumber}`}</span><span>Payment · {paymentResult?.method || paymentMethod}</span></div>
          <div className="receipt-meta"><span>Payment status</span><b className={`receipt-payment-status${paymentStatus === 'PAID' ? ' receipt-payment-paid' : ''}`}>{paymentStatus}</b></div>
          <div className="receipt-rule" />
          <div className="receipt-items-heading"><span>ITEM</span><span>QTY</span><span>AMOUNT</span></div>
          {receipt.items.map((item) => <div className="receipt-item" key={item.id}><span>{item.name} {item.portion ? `(${item.portion})` : ''}<small className={item.complimentary ? 'receipt-comp' : ''}>{item.complimentary ? 'COMPLIMENTARY · ₹0' : `${formatCurrency(item.price)} each`}</small>{item.notes ? <small>{item.notes}</small> : null}</span><span>{item.quantity}</span><b>{formatCurrency(item.price * item.quantity)}</b></div>)}
          <div className="receipt-rule" />
          <div className="receipt-total-line"><span>Subtotal</span><b>{formatCurrency(receipt.subtotal)}</b></div>
          {receipt.discountAmount > 0 && <div className="receipt-total-line receipt-discount-line"><span>Discount · {receipt.discountPercent}%</span><b>− {formatCurrency(receipt.discountAmount)}</b></div>}
          <div className="receipt-total-line"><span>Taxable amount</span><b>{formatCurrency(receipt.taxableSubtotal)}</b></div>
          <div className="receipt-total-line"><span>CGST · 2.5%</span><b>{formatCurrency(Math.round(receipt.taxableSubtotal * 0.025))}</b></div>
          <div className="receipt-total-line"><span>SGST · 2.5%</span><b>{formatCurrency(receipt.tax - Math.round(receipt.taxableSubtotal * 0.025))}</b></div>
          <div className="receipt-rule" />
          <div className="receipt-grand-total"><span>TOTAL</span><b>{formatCurrency(receipt.total)}</b></div>
          {(receipt.guestCount || 1) > 1 && <div className="receipt-guest-shares"><b>Equal split · {receipt.guestCount} guests</b>{guestShares.map((share, index) => <span key={index}>Guest {index + 1} · {formatCurrency(share)}</span>)}</div>}
          {paymentResult?.method === 'Cash' && <div className="receipt-total-line"><span>Cash received · change</span><b>{formatCurrency(paymentResult.cashReceived)} · {formatCurrency(paymentResult.change)}</b></div>}
          {paymentResult?.method === 'Split' && <div className="receipt-total-line"><span>Cash · UPI</span><b>{formatCurrency(paymentResult.cashAmount)} · {formatCurrency(paymentResult.upiAmount)}</b></div>}
          <div className="receipt-demo-stamp">DEMO BILL · NOT A TAX INVOICE</div>
        </div>
        <div className="receipt-modal-actions">
          <button className="button-secondary" onClick={() => window.print()}><Icon name="print" size={16} /> Print bill</button>
          {completed && <button className="button-primary" onClick={onClose}>Start another bill <Icon name="arrow" size={15} /></button>}
        </div>
        {!completed && <p className="receipt-disclaimer"><Icon name="shield" size={14} /> Payment is simulated locally. No financial transaction is initiated.</p>}
      </section>
    </div>
  )
}

function PosDemo() {
  const [initialWorkspace] = useState(loadDemoData)
  const [demoData, setDemoData] = useState(initialWorkspace.data)
  const [storageWarning] = useState(initialWorkspace.warning)
  const [activeScreen, setActiveScreen] = useState('overview')
  const [activeRole, setActiveRole] = useState('Owner')
  const [orderType, setOrderType] = useState('Dine in')
  const [selectedTable, setSelectedTable] = useState('01')
  const [activeParcelNumber, setActiveParcelNumber] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const [selectedPortions, setSelectedPortions] = useState({})
  const [notice, setNotice] = useState('')
  const [receipt, setReceipt] = useState(null)
  const [receiptCompleted, setReceiptCompleted] = useState(false)
  const [paymentResult, setPaymentResult] = useState(null)
  const [orderFilter, setOrderFilter] = useState('All orders')
  const [inventoryFilter, setInventoryFilter] = useState('All stock')
  const [reportRange, setReportRange] = useState('Today')
  const [kotFilter, setKotFilter] = useState('All')
  const [focusedOrder, setFocusedOrder] = useState(null)
  const [moveRequest, setMoveRequest] = useState(null)
  const [toast, setToast] = useState('')

  const { inventory, soldOutItemIds, tables, orders, kots, drafts, parcelNumbers, dailySales, dailyOrderCount } = demoData
  const inventoryMap = useMemo(() => Object.fromEntries(inventory.map((item) => [item.id, item.quantity])), [inventory])
  const context = { type: orderType, tableId: selectedTable, parcelNumber: activeParcelNumber }
  const currentDraft = drafts[draftKey(context)] || createEmptyDraft()
  const cart = currentDraft.items
  const activeOrder = findOrderForContext(orders, context)
  const orderItems = activeOrder ? getActiveKotItems(kots, activeOrder.id) : []
  const subtotal = sumOrderItems([...orderItems, ...cart])
  const discountPercent = Number(currentDraft.discountPercent || 0)
  const discountAmount = Math.round(subtotal * discountPercent / 100)
  const taxableSubtotal = Math.max(0, subtotal - discountAmount)
  const tax = Math.round(taxableSubtotal * 0.05)
  const total = taxableSubtotal + tax
  const activeTitle = navigation.find((item) => item.id === activeScreen)?.label || 'Overview'
  const orderCount = orders.filter((order) => order.status !== 'Completed').length
  const lowStockCount = inventory.filter((item) => item.quantity <= item.par).length
  const closedParcelNumbers = orders.filter((order) => order.type === 'Parcel' && (order.paid || order.status === 'Completed')).map((order) => order.parcelNumber)

  useEffect(() => {
    try {
      window.localStorage.setItem(demoStorageKey, JSON.stringify({ version: 1, data: demoData }))
    } catch (error) {
      console.error('Could not save the POS demo workspace.', error)
    }
  }, [demoData])

  const availablePortions = (item, portion = 'Full') => {
    if (soldOutItemIds.includes(item.id)) return 0
    const multiplier = portionMultiplier(portion)
    const limits = Object.entries(item.recipe).map(([id, amount]) => Math.floor((inventoryMap[id] || 0) / (amount * multiplier)))
    return limits.length ? Math.min(...limits) : 0
  }

  const showToast = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 3500)
  }

  const updateCurrentDraft = (updater, value) => {
    const key = draftKey(context)
    setDemoData((current) => {
      const currentDraft = current.drafts[key] || createEmptyDraft()
      const nextDraft = typeof updater === 'function'
        ? updater(currentDraft)
        : typeof updater === 'string'
          ? { ...currentDraft, [updater]: value }
          : { ...currentDraft, ...updater }
      return { ...current, drafts: { ...current.drafts, [key]: nextDraft } }
    })
  }

  const validateContext = (current = demoData) => {
    if (orderType === 'Parcel') {
      if (!activeParcelNumber || !current.parcelNumbers.includes(activeParcelNumber)) return 'Create or select a parcel order first.'
      if (closedParcelNumbers.includes(activeParcelNumber)) return `Parcel ${activeParcelNumber} is closed. Start a new parcel order.`
      return ''
    }
    const table = current.tables.find((item) => item.id === selectedTable)
    const order = findOrderForContext(current.orders, context)
    if (!table) return 'Select an available table before continuing.'
    if (table.serviceState === 'Paid' || (table.status === 'Occupied' && !order && table.serviceState !== 'Running')) return `Table ${selectedTable} is not available for a new order.`
    if (table.status === 'Reserved') return `Table ${selectedTable} is reserved. Choose another table.`
    return ''
  }

  const unavailableDraftItem = () => cart.find((line) => {
    const menuItem = menuItems.find((item) => item.id === line.menuItemId)
    return !menuItem || line.quantity > availablePortions(menuItem, line.portion)
  })

  const addToCart = (item, portion) => {
    const id = cartLineId(item.id, portion)
    const existing = cart.find((line) => line.id === id)
    if ((existing?.quantity || 0) >= availablePortions(item, portion)) {
      setNotice(`Not enough stock for ${item.name} (${portion}). Restock an ingredient in Inventory.`)
      return
    }
    setNotice('')
    updateCurrentDraft((current) => {
      const line = current.items.find((entry) => entry.id === id)
      const nextItems = line
        ? current.items.map((entry) => entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current.items, { id, menuItemId: item.id, name: item.name, portion, price: portionPrice(item, portion), basePrice: portionPrice(item, portion), complimentary: false, quantity: 1, notes: '' }]
      const next = { ...current, items: nextItems }
      return next
    })
    if (orderType === 'Dine in') {
      setDemoData((current) => ({
        ...current,
        tables: current.tables.map((table) => table.id === selectedTable && table.status === 'Available'
          ? { ...table, status: 'Occupied', serviceState: 'Running', startedAt: new Date().toISOString() }
          : table),
      }))
    }
  }

  const changeCart = (lineId, change) => {
    const line = cart.find((item) => item.id === lineId)
    const menuItem = menuItems.find((item) => item.id === line?.menuItemId)
    if (!line || !menuItem) return
    if (change > 0 && line.quantity >= availablePortions(menuItem, line.portion)) {
      setNotice(`Not enough stock for ${line.name} (${line.portion}). Restock an ingredient in Inventory.`)
      return
    }
    setNotice('')
    updateCurrentDraft((current) => ({
      ...current,
      items: current.items
        .map((item) => item.id === lineId ? { ...item, quantity: item.quantity + change } : item)
        .filter((item) => item.quantity > 0),
    }))
  }

  const updateItemNote = (lineId, notes) => {
    updateCurrentDraft((current) => ({
      ...current,
      items: current.items.map((item) => item.id === lineId ? { ...item, notes } : item),
    }))
  }

  const toggleComplimentary = (lineId) => {
    updateCurrentDraft((current) => ({
      ...current,
      items: current.items.map((line) => {
        if (line.id !== lineId) return line
        const menuItem = menuItems.find((item) => item.id === line.menuItemId)
        const basePrice = line.basePrice ?? (menuItem ? portionPrice(menuItem, line.portion) : line.price)
        const complimentary = !line.complimentary
        return { ...line, basePrice, complimentary, price: complimentary ? 0 : basePrice }
      }),
    }))
  }

  const toggleSoldOut = (itemId) => {
    setDemoData((current) => ({
      ...current,
      soldOutItemIds: current.soldOutItemIds.includes(itemId)
        ? current.soldOutItemIds.filter((id) => id !== itemId)
        : [...current.soldOutItemIds, itemId],
    }))
    const item = menuItems.find((entry) => entry.id === itemId)
    if (item) showToast(`${item.name} ${soldOutItemIds.includes(itemId) ? 'marked available' : 'marked sold out'}.`)
  }

  const toggleBillHold = () => updateCurrentDraft((current) => ({ ...current, held: !current.held }))

  const createParcel = () => {
    const parcelNumber = demoData.nextParcelNumber
    const key = `parcel:${parcelNumber}`
    setDemoData((current) => ({
      ...current,
      parcelNumbers: current.parcelNumbers.includes(parcelNumber) ? current.parcelNumbers : [...current.parcelNumbers, parcelNumber],
      nextParcelNumber: Math.max(current.nextParcelNumber, parcelNumber + 1),
      drafts: { ...current.drafts, [key]: current.drafts[key] || createEmptyDraft() },
    }))
    setOrderType('Parcel')
    setActiveParcelNumber(parcelNumber)
    setNotice('')
  }

  const selectOrderType = (type) => {
    if (type === 'Parcel') {
      const lastParcel = activeParcelNumber || parcelNumbers.at(-1)
      if (lastParcel) {
        setOrderType('Parcel')
        setActiveParcelNumber(lastParcel)
      } else {
        createParcel()
      }
      setNotice('')
      return
    }
    setOrderType('Dine in')
    setActiveParcelNumber(null)
    setNotice('')
  }

  const selectParcel = (parcelNumber) => {
    if (closedParcelNumbers.includes(parcelNumber)) {
      setNotice(`Parcel ${parcelNumber} is closed. Use + Parcel to start another order.`)
      return
    }
    setOrderType('Parcel')
    setActiveParcelNumber(parcelNumber)
    setNotice('')
  }

  const setPortion = (itemId, portion) => {
    setSelectedPortions((current) => ({ ...current, [itemId]: portion }))
  }

  const sendKot = () => {
    if (currentDraft.held) {
      setNotice('Resume this held bill before sending its KOT.')
      return
    }
    const unavailableItem = unavailableDraftItem()
    if (unavailableItem) {
      setNotice(`${unavailableItem.name} is sold out or no longer available in this portion.`)
      return
    }
    const validation = validateContext()
    if (validation) {
      setNotice(validation)
      return
    }
    if (!cart.length) {
      setNotice('Add at least one menu item before sending a KOT.')
      return
    }
    const result = createKotFromDraft(demoData, context)
    if (!result.kot) {
      setNotice('Add at least one menu item before sending a KOT.')
      return
    }
    setDemoData(result.data)
    setNotice('')
    showToast(`${result.kot.id} sent to the Kitchen Display System.`)
  }

  const generateBill = () => {
    if (currentDraft.held) {
      setNotice('Resume this held bill before generating the bill.')
      return
    }
    const unavailableItem = unavailableDraftItem()
    if (unavailableItem) {
      setNotice(`${unavailableItem.name} is sold out or no longer available in this portion.`)
      return
    }
    const validation = validateContext()
    if (validation) {
      setNotice(validation)
      return
    }
    let updatedData = demoData
    if (cart.length) updatedData = createKotFromDraft(updatedData, context).data
    const order = findOrderForContext(updatedData.orders, context)
    const items = order ? getActiveKotItems(updatedData.kots, order.id) : []
    if (!order || !items.length) {
      setNotice('Add and send at least one item before generating a bill.')
      return
    }
    const billSubtotal = sumOrderItems(items)
    const billDiscount = Math.round(billSubtotal * Number(currentDraft.discountPercent || 0) / 100)
    const billTaxableSubtotal = Math.max(0, billSubtotal - billDiscount)
    const billTax = Math.round(billTaxableSubtotal * 0.05)
    const billTotal = billTaxableSubtotal + billTax
    const receiptData = {
      id: order.id,
      orderId: order.id,
      draftKey: draftKey(context),
      date: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      orderType,
      table: orderType === 'Dine in' ? selectedTable : null,
      parcelNumber: orderType === 'Parcel' ? activeParcelNumber : null,
      paymentMethod,
      paymentStatus: 'PENDING',
      items,
      subtotal: billSubtotal,
      discountPercent: Number(currentDraft.discountPercent || 0),
      discountAmount: billDiscount,
      taxableSubtotal: billTaxableSubtotal,
      tax: billTax,
      total: billTotal,
      guestCount: Math.max(1, Number(currentDraft.guestCount) || 1),
    }
    updatedData = {
      ...updatedData,
      orders: updatedData.orders.map((item) => item.id === order.id
        ? { ...item, billTotal, billSubtotal, billDiscountAmount: billDiscount, billTax }
        : item),
    }
    if (orderType === 'Dine in') {
      updatedData = {
        ...updatedData,
        tables: updatedData.tables.map((table) => table.id === selectedTable
          ? { ...table, status: 'Occupied', serviceState: 'Bill printed', orderId: order.id }
          : table),
      }
    }
    setDemoData(updatedData)
    setReceipt(receiptData)
    setReceiptCompleted(false)
    setPaymentResult(null)
    setNotice('')
  }

  const completeDemoSale = (payment) => {
    if (!receipt || receiptCompleted) return
    const paidAmount = payment.method === 'Cash'
      ? Number(payment.cashReceived)
      : payment.method === 'Split'
        ? Number(payment.cashAmount) + Number(payment.upiAmount)
        : receipt.total
    if (!Number.isFinite(paidAmount)) {
      setNotice('Enter valid payment amounts.')
      return
    }
    if (payment.method === 'Cash' && paidAmount < receipt.total) {
      setNotice('Cash received must cover the bill total.')
      return
    }
    if (payment.method === 'Split' && (Number(payment.cashAmount) < 0 || Number(payment.upiAmount) < 0 || Math.round(paidAmount * 100) !== Math.round(receipt.total * 100))) {
      setNotice('Split cash and UPI amounts must exactly match the bill total.')
      return
    }
    if (!['Cash', 'UPI', 'Split', 'Card'].includes(payment.method)) {
      setNotice('Choose a supported demo payment method.')
      return
    }
    const paymentDetails = {
      ...payment,
      paidAmount: receipt.total,
      status: 'PAID',
      paidAt: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
    }
    setDemoData((current) => {
      const existingOrder = current.orders.find((order) => order.id === receipt.orderId)
      if (existingOrder?.paid) return current
      const nextInventory = current.inventory.map((stockItem) => {
        const used = receipt.items.reduce((sum, billItem) => {
          const menuItem = menuItems.find((item) => item.id === billItem.menuItemId || item.name === billItem.name)
          return sum + (menuItem?.recipe[stockItem.id] || 0) * portionMultiplier(billItem.portion) * billItem.quantity
        }, 0)
        return { ...stockItem, quantity: Math.max(0, Number((stockItem.quantity - used).toFixed(2))) }
      })
      return {
        ...current,
        inventory: nextInventory,
        orders: current.orders.map((order) => order.id === receipt.orderId
          ? { ...order, paid: true, billTotal: receipt.total, paymentMethod: paymentDetails.method, paymentStatus: 'PAID', paymentDetails }
          : order),
        tables: receipt.table
          ? current.tables.map((table) => table.id === receipt.table
            ? { ...table, status: 'Occupied', serviceState: 'Paid', orderId: receipt.orderId }
            : table)
          : current.tables,
        drafts: {
          ...current.drafts,
          [receipt.draftKey]: { ...createEmptyDraft(), ...(current.drafts[receipt.draftKey] || {}), items: [], discountPercent: 0, held: false },
        },
        dailySales: current.dailySales + receipt.total,
        dailyOrderCount: current.dailyOrderCount + 1,
      }
    })
    if (receipt.table) {
      const nextAvailableTable = demoData.tables.find((table) => table.status === 'Available')
      if (nextAvailableTable) setSelectedTable(nextAvailableTable.id)
    }
    setPaymentResult(paymentDetails)
    setReceipt((current) => current ? { ...current, paymentMethod: paymentDetails.method, paymentStatus: 'PAID', paymentDetails } : current)
    setReceiptCompleted(true)
    setNotice('')
  }

  const adjustInventory = (id, change) => {
    setDemoData((current) => ({
      ...current,
      inventory: current.inventory.map((item) => item.id === id ? { ...item, quantity: Math.max(0, Number((item.quantity + change).toFixed(2))) } : item),
    }))
    showToast(change > 0 ? 'Sample stock replenished.' : 'Sample stock adjusted.')
  }

  const advanceOrder = (order) => {
    const nextStatus = order.status === 'Preparing' ? 'Ready' : 'Completed'
    setDemoData((current) => ({
      ...current,
      orders: current.orders.map((item) => item.id === order.id ? { ...item, status: nextStatus } : item),
      kots: nextStatus === 'Ready'
        ? current.kots.map((kot) => kot.orderId === order.id && kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0) ? { ...kot, status: 'Ready' } : kot)
        : current.kots,
      tables: order.table
        ? current.tables.map((table) => table.id !== order.table
          ? table
          : nextStatus === 'Completed' && table.serviceState === 'Paid'
            ? { ...table, status: 'Available', serviceState: undefined, orderId: undefined, startedAt: undefined }
            : { ...table, serviceState: nextStatus === 'Ready' ? 'Order ready' : 'Running' })
        : current.tables,
    }))
    showToast(`${order.id} marked ${nextStatus.toLowerCase()}.`)
  }

  const startTableOrder = (table) => {
    if (table.serviceState === 'Paid') {
      setNotice(`Table ${table.id} has already been paid. Clear it before starting another order.`)
      return
    }
    setSelectedTable(table.id)
    setOrderType('Dine in')
    setActiveParcelNumber(null)
    setNotice('')
    const key = `table:${table.id}`
    setDemoData((current) => ({
      ...current,
      tables: current.tables.map((item) => item.id === table.id && item.status === 'Available'
        ? { ...item, status: 'Occupied', serviceState: 'Running', startedAt: new Date().toISOString() }
        : item),
      drafts: { ...current.drafts, [key]: current.drafts[key] || createEmptyDraft() },
    }))
    setActiveScreen('billing')
  }

  const releaseTable = (table) => {
    setDemoData((current) => ({
      ...current,
      tables: current.tables.map((item) => item.id === table.id ? { ...item, status: 'Available', serviceState: undefined, orderId: undefined, startedAt: undefined } : item),
    }))
    showToast(`Table ${table.id} is now available.`)
  }

  const addTable = () => {
    setDemoData((current) => {
      const nextId = Math.max(0, ...current.tables.map((table) => Number(table.id) || 0)) + 1
      return { ...current, tables: [...current.tables, { id: String(nextId).padStart(2, '0'), section: 'Main hall', seats: 4, status: 'Available' }] }
    })
    showToast('A new sample table was added to the main hall.')
  }

  const clearPaidTable = (table) => {
    setDemoData((current) => ({
      ...current,
      tables: current.tables.map((item) => item.id === table.id ? { ...item, status: 'Available', serviceState: undefined, orderId: undefined, startedAt: undefined } : item),
      orders: current.orders.map((order) => order.id === table.orderId ? { ...order, status: 'Completed' } : order),
      drafts: { ...current.drafts, [`table:${table.id}`]: createEmptyDraft() },
    }))
    showToast(`Table ${table.id} is free for the next guests.`)
  }

  const viewTableOrder = (table) => {
    setOrderFilter('All orders')
    setFocusedOrder(table.orderId)
    setActiveScreen('orders')
  }

  const viewTableKitchen = () => {
    setKotFilter('Dine in')
    setActiveScreen('kitchen')
  }

  const updateKotStatus = (kotId, status) => {
    setDemoData((current) => {
      const kots = current.kots.map((kot) => kot.id === kotId ? { ...kot, status } : kot)
      const changedKot = kots.find((kot) => kot.id === kotId)
      if (!changedKot) return current
      const activeKots = kots.filter((kot) => kot.orderId === changedKot.orderId && kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0))
      const orderStatus = getOrderKitchenStatus(kots, changedKot.orderId)
      return {
        ...current,
        kots,
        orders: current.orders.map((order) => order.id === changedKot.orderId && order.status !== 'Completed' && !order.paid
          ? { ...order, status: orderStatus }
          : order),
        tables: changedKot.table
          ? current.tables.map((table) => table.id === changedKot.table ? { ...table, serviceState: activeKots.length ? (orderStatus === 'Ready' ? 'Order ready' : 'Running KOT') : 'Running' } : table)
          : current.tables,
      }
    })
    showToast(`${kotId} marked ${status.toLowerCase()}.`)
  }

  const cancelKotItem = (kotId, itemId) => {
    let cancelled = 0
    setDemoData((current) => {
      const sourceKot = current.kots.find((kot) => kot.id === kotId)
      const sourceItem = sourceKot?.items.find((item) => item.id === itemId)
      if (!sourceKot || !sourceItem || sourceItem.activeQuantity <= 0) return current
      const order = current.orders.find((item) => item.id === sourceKot.orderId)
      if (order?.paid) return current
      cancelled = sourceItem.activeQuantity
      const newKotId = `KOT-${String(current.nextKotNumber).padStart(3, '0')}`
      const createdAt = new Date().toISOString()
      const updatedKots = current.kots.map((kot) => kot.id !== kotId ? kot : {
        ...kot,
        items: kot.items.map((item) => item.id === itemId
          ? { ...item, activeQuantity: 0, cancelledQuantity: item.cancelledQuantity + cancelled }
          : item),
      })
      const changedKot = {
        ...sourceKot,
        id: newKotId,
        createdAt,
        kind: 'changed',
        sourceKotId: sourceKot.id,
        status: 'Pending',
        items: [{
          ...sourceItem,
          id: `${newKotId}-ITEM-1`,
          quantity: cancelled,
          activeQuantity: 0,
          cancelledQuantity: cancelled,
          movedQuantity: 0,
        }],
      }
      const kots = [changedKot, ...updatedKots]
      const activeItems = getActiveKotItems(kots, sourceKot.orderId)
      const activeKotCount = kots.filter((kot) => kot.orderId === sourceKot.orderId && kot.kind !== 'duplicate' && kot.items.some((item) => item.activeQuantity > 0)).length
      const orderStatus = getOrderKitchenStatus(kots, sourceKot.orderId)
      return {
        ...current,
        kots,
        nextKotNumber: current.nextKotNumber + 1,
        orders: current.orders.map((item) => item.id === sourceKot.orderId ? {
          ...item,
          items: activeItems,
          total: sumOrderItems(activeItems),
          status: activeItems.length ? orderStatus : 'Completed',
          billTotal: undefined,
        } : item),
        tables: sourceKot.table
          ? current.tables.map((table) => table.id === sourceKot.table
            ? { ...table, serviceState: activeKotCount ? (orderStatus === 'Ready' ? 'Order ready' : 'Running KOT') : 'Running', ...(!activeItems.length ? { orderId: undefined } : {}) }
            : table)
          : current.tables,
      }
    })
    if (cancelled) showToast(`CANCEL sent in an ORDER CHANGED KOT from ${kotId}.`)
  }

  const duplicateKot = (kotId) => {
    setDemoData((current) => {
      const sourceKot = current.kots.find((kot) => kot.id === kotId)
      if (!sourceKot || sourceKot.kind === 'duplicate') return current
      const newKotId = `KOT-${String(current.nextKotNumber).padStart(3, '0')}`
      const duplicate = {
        ...sourceKot,
        id: newKotId,
        createdAt: new Date().toISOString(),
        kind: 'duplicate',
        sourceKotId: sourceKot.id,
        items: sourceKot.items.map((item, index) => ({ ...item, id: `${newKotId}-ITEM-${index + 1}`, activeQuantity: 0 })),
      }
      return { ...current, kots: [duplicate, ...current.kots], nextKotNumber: current.nextKotNumber + 1 }
    })
    showToast(`Duplicate KOT created. Owner alerted in this demo.`)
  }

  const moveKot = (kotId, targetTable, itemId = null) => {
    let movedItemCount = 0
    setDemoData((current) => {
      const sourceKot = current.kots.find((kot) => kot.id === kotId)
      const sourceOrder = sourceKot && current.orders.find((order) => order.id === sourceKot.orderId)
      if (!sourceKot || sourceKot.type !== 'Dine in' || sourceKot.kind === 'duplicate' || sourceOrder?.paid) return current
      const itemsToMove = sourceKot.items.filter((item) => item.activeQuantity > 0 && (!itemId || item.id === itemId))
      if (!itemsToMove.length) return current
      const targetContext = { type: 'Dine in', tableId: targetTable, parcelNumber: null }
      const targetOrder = findOrderForContext(current.orders, targetContext)
      const targetOrderId = targetOrder?.id || `TS-${String(current.nextOrderNumber).padStart(4, '0')}`
      const newKotId = `KOT-${String(current.nextKotNumber).padStart(3, '0')}`
      const createdAt = new Date().toISOString()
      movedItemCount = itemsToMove.length
      const movedKot = {
        ...sourceKot,
        id: newKotId,
        orderId: targetOrderId,
        table: targetTable,
        createdAt,
        status: 'Pending',
        kind: 'moved',
        sourceKotId: sourceKot.id,
        items: itemsToMove.map((item, index) => ({
          ...item,
          id: `${newKotId}-ITEM-${index + 1}`,
          quantity: item.activeQuantity,
          activeQuantity: item.activeQuantity,
          cancelledQuantity: 0,
          movedQuantity: 0,
        })),
      }
      const sourceIds = new Set(itemsToMove.map((item) => item.id))
      const changedSourceKots = current.kots.map((kot) => kot.id !== sourceKot.id ? kot : {
        ...kot,
        items: kot.items.map((item) => sourceIds.has(item.id)
          ? { ...item, activeQuantity: 0, movedQuantity: item.movedQuantity + item.activeQuantity }
          : item),
      })
      const kots = [movedKot, ...changedSourceKots]
      const sourceItems = getActiveKotItems(kots, sourceKot.orderId)
      const targetItems = getActiveKotItems(kots, targetOrderId)
      const sourceKitchenState = getTableKitchenState(kots, sourceKot.orderId)
      const updatedSourceOrder = sourceOrder ? {
        ...sourceOrder,
        items: sourceItems,
        total: sumOrderItems(sourceItems),
        status: sourceItems.length ? sourceOrder.status : 'Completed',
        billTotal: undefined,
        ...(sourceItems.length ? {} : { movedTo: targetTable }),
      } : null
      const targetOrderValue = {
        ...(targetOrder || {}),
        id: targetOrderId,
        type: 'Dine in',
        table: targetTable,
        parcelNumber: null,
        guest: `Table ${targetTable}`,
        items: targetItems,
        total: sumOrderItems(targetItems),
        status: 'Preparing',
        time: new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(new Date(createdAt)),
        createdAt: targetOrder?.createdAt || createdAt,
        billTotal: undefined,
      }
      const orders = current.orders
        .map((order) => {
          if (order.id === sourceKot.orderId) return updatedSourceOrder
          if (order.id === targetOrderId) return targetOrderValue
          return order
        })
        .filter(Boolean)
      if (!targetOrder) orders.unshift(targetOrderValue)
      return {
        ...current,
        kots,
        orders,
        nextOrderNumber: targetOrder ? current.nextOrderNumber : current.nextOrderNumber + 1,
        nextKotNumber: current.nextKotNumber + 1,
        tables: current.tables.map((table) => {
          if (table.id === sourceKot.table && !sourceItems.length) return { ...table, status: 'Available', serviceState: undefined, orderId: undefined, startedAt: undefined }
          if (table.id === sourceKot.table) return { ...table, serviceState: sourceKitchenState }
          if (table.id === targetTable) return { ...table, status: 'Occupied', serviceState: 'Running KOT', orderId: targetOrderId, startedAt: table.startedAt || createdAt }
          return table
        }),
      }
    })
    setMoveRequest(null)
    if (movedItemCount) showToast(`${movedItemCount === 1 ? 'Item' : 'KOT'} moved to Table ${targetTable}. A MOVED KOT was created.`)
  }

  const exportReport = (report, range, summary) => {
    const csvRows = [
      ['MachMind360 POS Demo', `${range} sales report`],
      ['Restaurant', 'The Santosa, Anmod'],
      ['Metric', 'Sample value'],
      ['Sales', report.sales],
      ['Orders', report.orders],
      ['Average order value', Math.round(report.average)],
      ['Sales excluding sample GST', summary.taxableSales],
      ['Sample CGST', summary.cgst],
      ['Sample SGST', summary.sgst],
      ['Sample expenses', summary.expenses],
      ['Illustrative profit', summary.profit],
      [],
      ['Payment method', 'Sample amount'],
      ...summary.paymentBreakdown.map((item) => [item.label, item.amount]),
      [],
      ['Order type', 'Orders', 'Sample sales'],
      ...summary.orderBreakdown.map((item) => [item.label, item.orders, item.sales]),
      [],
      ['Expense category', 'Sample amount'],
      ...summary.expensesBreakdown.map((item) => [item.label, item.amount]),
      [],
      [report.title, 'Sales (INR)'],
      ...report.labels.map((label, index) => [label, report.values[index]]),
    ]
    const csv = csvRows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `machmind360-pos-${range.replace(' ', '-').toLowerCase()}-report.csv`
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    showToast('Sample sales report exported as CSV.')
  }

  const navigate = (screen) => {
    if (!roleScreens[activeRole].includes(screen)) {
      showToast(`${activeRole} demo access does not include ${navigation.find((item) => item.id === screen)?.label || 'that screen'}.`)
      return
    }
    setActiveScreen(screen)
    setNotice('')
  }

  const switchDemoRole = (role) => {
    if (!roleScreens[role]) return
    setActiveRole(role)
    if (!roleScreens[role].includes(activeScreen)) setActiveScreen(roleScreens[role][0])
    setNotice('')
    showToast(`Switched to the ${role} navigation preview.`)
  }

  const selectedKot = moveRequest ? kots.find((kot) => kot.id === moveRequest.kotId) : null
  const openMoveDialog = (kotId, itemId = null) => setMoveRequest({ kotId, itemId })

  return (
    <div className="pos-app">
      <aside className="pos-sidebar">
        <a className="pos-sidebar-brand" href="/" aria-label="Return to MachMind360 website">
          <span className="pos-brand-wordmark">MachMind<span>360</span></span>
          <small>RESTAURANT SYSTEMS</small>
        </a>
        <div className="sidebar-workspace"><span className="sidebar-section-label">WORKSPACE</span><span className="sidebar-location"><Icon name="pin" size={15} /><span><b className="restaurant-brand-text">The Santosa, Anmod</b><small>Local demo data</small></span><Icon name="chevron" size={14} /></span></div>
        <nav className="pos-sidebar-nav" aria-label="POS sections">
          <span className="sidebar-section-label">OPERATIONS</span>
          {navigation.filter((item) => roleScreens[activeRole].includes(item.id)).map((item) => <button className={`pos-nav-item${activeScreen === item.id ? ' pos-nav-active' : ''}`} key={item.id} onClick={() => navigate(item.id)} title={item.label}><span className="pos-nav-icon"><Icon name={item.icon} size={19} /></span><span className="pos-nav-label">{item.label}</span>{item.id === 'orders' && orderCount > 0 && <span className="pos-nav-count">{orderCount}</span>}{item.id === 'inventory' && lowStockCount > 0 && <span className="pos-nav-alert">{lowStockCount}</span>}</button>)}
        </nav>
        <div className="pos-sidebar-footer"><div className="sidebar-demo-card"><span className="sidebar-demo-icon"><Icon name="spark" size={16} /></span><span><b>Demo workspace</b><small>Local sample data only</small></span></div><a className="back-to-marketing" href="/"><Icon name="arrow" size={15} /> Back to MachMind360</a></div>
      </aside>

      <div className="pos-main">
        <header className="pos-topbar">
          <BackButton className="pos-back-button" />
          <div className="pos-breadcrumb"><span className="pos-topbar-wordmark">MachMind<span>360</span></span><span className="pos-breadcrumb-restaurant">The Santosa, Anmod</span><span className="pos-breadcrumb-context">Restaurant POS</span><Icon name="chevron" size={13} /><b>{activeTitle}</b></div>
          <div className="pos-topbar-actions"><span className="topbar-demo-status"><i /> DEMO MODE</span><span className="topbar-date">{headerDateLabel}</span><span className="topbar-avatar">{roleProfiles[activeRole].initials}</span><span className="topbar-user"><b>{roleProfiles[activeRole].name}</b><small>{activeRole} · preview</small></span><label className="role-switcher-label"><span>Role</span><select className="role-switcher" aria-label="Switch demo role" value={activeRole} onChange={(event) => switchDemoRole(event.target.value)}>{Object.keys(roleProfiles).map((role) => <option value={role} key={role}>{role}</option>)}</select></label></div>
        </header>
        <div className="demo-safety-banner"><span className="safety-banner-icon"><Icon name="shield" size={15} /></span><p><b>Safe demo environment</b><span> All orders, stock, and reports are simulated locally. No restaurant database or payment service is connected.</span></p><span className="safety-banner-tag">SAMPLE DATA</span></div>
        {storageWarning && <div className="storage-warning" role="status">{storageWarning}</div>}

        <main className="pos-content-area">
          {activeScreen === 'overview' && <OverviewScreen onNavigate={navigate} dailySales={dailySales} dailyOrderCount={dailyOrderCount} orders={orders} inventory={inventory} />}
          {activeScreen === 'billing' && <BillingScreen menuStock={availablePortions} soldOutItemIds={soldOutItemIds} onToggleSoldOut={toggleSoldOut} cart={cart} orderItems={orderItems} onAdd={addToCart} onChange={changeCart} onUpdateNote={updateItemNote} onToggleComplimentary={toggleComplimentary} onToggleHold={toggleBillHold} onGenerate={generateBill} onSendKot={sendKot} subtotal={subtotal} discountAmount={discountAmount} discountPercent={discountPercent} taxableSubtotal={taxableSubtotal} tax={tax} total={total} orderType={orderType} setOrderType={selectOrderType} selectedTable={selectedTable} setSelectedTable={(tableId) => { setSelectedTable(tableId); setNotice('') }} tables={tables} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} notice={notice} setNotice={setNotice} selectedPortions={selectedPortions} setSelectedPortion={setPortion} parcelNumbers={parcelNumbers} activeParcelNumber={activeParcelNumber} onCreateParcel={createParcel} onSelectParcel={selectParcel} draft={currentDraft} onUpdateDraft={updateCurrentDraft} activeOrderId={activeOrder?.id} />}
          {activeScreen === 'orders' && <OrdersScreen orders={orders} onAdvance={advanceOrder} filter={orderFilter} setFilter={setOrderFilter} focusedOrder={focusedOrder} onClearFocus={() => setFocusedOrder(null)} onNewBill={() => navigate('billing')} />}
          {activeScreen === 'tables' && <TablesScreen tables={tables} orders={orders} drafts={drafts} onStart={startTableOrder} onRelease={releaseTable} onViewOrder={viewTableOrder} onClear={clearPaidTable} onViewKitchen={viewTableKitchen} onAddTable={addTable} />}
          {activeScreen === 'kitchen' && <KitchenDisplayScreen kots={kots} orders={orders} filter={kotFilter} setFilter={setKotFilter} onStatusChange={updateKotStatus} onCancelItem={cancelKotItem} onMoveRequest={openMoveDialog} onDuplicate={duplicateKot} onOpenBilling={() => navigate('billing')} />}
          {activeScreen === 'inventory' && <InventoryScreen inventory={inventory} onAdjust={adjustInventory} filter={inventoryFilter} setFilter={setInventoryFilter} />}
          {activeScreen === 'reports' && <ReportsScreen dailySales={dailySales} dailyOrderCount={dailyOrderCount} range={reportRange} setRange={setReportRange} onExport={exportReport} />}
          {activeScreen === 'ai-assistant' && <AIAssistantScreen dailySales={dailySales} dailyOrderCount={dailyOrderCount} inventory={inventory} onNavigate={navigate} />}
          {activeScreen === 'staff-settings' && <StaffSettingsScreen role={activeRole} onRoleChange={switchDemoRole} />}
        </main>
        <footer className="pos-app-footer"><span>MachMind360 · Restaurant POS</span><span><i /> All activity is simulated · Not connected to live systems</span></footer>
      </div>

      {toast && <div className="pos-toast" role="status"><Icon name="check" size={16} />{toast}</div>}
      {receipt && <BillModal key={receipt.id} receipt={receipt} onComplete={completeDemoSale} onClose={() => { setReceipt(null); setReceiptCompleted(false); setPaymentResult(null) }} completed={receiptCompleted} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} paymentResult={paymentResult} />}
      {selectedKot && <MoveKotDialog kot={selectedKot} itemId={moveRequest.itemId} tables={tables} onClose={() => setMoveRequest(null)} onConfirm={(tableId) => moveKot(selectedKot.id, tableId, moveRequest.itemId)} />}
    </div>
  )
}

export default PosDemo
