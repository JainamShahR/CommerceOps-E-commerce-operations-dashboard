import { BarChart3, Boxes, ClipboardList, Package, ShoppingBag, X } from 'lucide-react';

const nav = [
  { id: 'overview', label: 'Overview', Icon: BarChart3 },
  { id: 'products', label: 'Products', Icon: Package },
  { id: 'orders', label: 'Orders', Icon: ClipboardList },
  { id: 'inventory', label: 'Inventory', Icon: Boxes },
];

export default function Sidebar({ active, onNavigate, mobileOpen, onClose }) {
  return <>
    {mobileOpen && <button aria-label="Close menu" className="sidebar-scrim" onClick={onClose} />}
    <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
      <div className="brand-row">
        <span className="brand-mark"><ShoppingBag size={22} strokeWidth={2.3} /></span>
        <div className="brand-text">Commerce<span>Ops</span><small>OPERATIONS HUB</small></div>
        <button aria-label="Close menu" className="sidebar-close icon-button" onClick={onClose}><X size={20} /></button>
      </div>
      <div className="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation" className="nav-list">
        {nav.map(({ id, label, Icon }) => (
          <button key={id} className={`nav-link ${active === id ? 'nav-link--active' : ''}`}
            onClick={() => { onNavigate(id); onClose(); }} aria-current={active === id ? 'page' : undefined}>
            <Icon size={19} strokeWidth={2} /> <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card">
          <span className="help-icon"><ShoppingBag size={20} /></span>
          <strong>Your storefront, simplified.</strong>
          <p>Products, orders, and insights in one place.</p>
          <span className="help-tag">Demo workspace</span>
        </div>
        <p className="sidebar-version">CommerceOps v0.1 · Portfolio project</p>
      </div>
    </aside>
  </>;
}
