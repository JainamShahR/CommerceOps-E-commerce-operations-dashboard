import { Menu, Store, CircleCheck } from 'lucide-react';

const headings = {
  overview: ['Dashboard overview', 'Here’s what’s happening with your store today.'],
  products: ['Product management', 'Organize and update everything in your catalog.'],
  orders: ['Orders', 'Keep your customers informed and orders on track.'],
  inventory: ['Inventory health', 'Spot products that need restocking.'],
};

export default function Topbar({ page, onMenu }) {
  const [title, subtitle] = headings[page];
  return <header className="topbar">
    <div className="topbar-heading">
      <button className="mobile-menu icon-button" aria-label="Open navigation" onClick={onMenu}><Menu size={22} /></button>
      <div><div className="breadcrumb"><Store size={13}/> Store workspace <span>/</span> {page}</div>
        <h1>{title}</h1><p>{subtitle}</p></div>
    </div>
    <div className="topbar-actions"><span className="demo-indicator"><CircleCheck size={14} /> Demo environment</span>
      <div className="avatar" title="Demo Admin">DA</div></div>
  </header>;
}
