import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AlertTriangle, ArrowRight, CheckCircle2, Package } from 'lucide-react';
import { currency } from '../utils/format.js';

export default function Inventory({ onNavigate }) {
  const products = useSelector(state => state.commerce.products);
  const [onlyLow, setOnlyLow] = useState(false);
  const low = products.filter(p => p.stock <= 10);
  const healthy = products.filter(p => p.stock > 10);
  const sorted = useMemo(() => [...products].sort((a, b) => a.stock - b.stock).filter(p => !onlyLow || p.stock <= 10), [products, onlyLow]);

  return <div className="page-stack">
    <div className="inventory-summary-grid"><div className="inventory-summary inventory-summary--alert"><span><AlertTriangle size={21}/></span><div><strong>{low.length}</strong><p>Low-stock products</p></div></div>
      <div className="inventory-summary inventory-summary--healthy"><span><CheckCircle2 size={21}/></span><div><strong>{healthy.length}</strong><p>Healthy-stock products</p></div></div></div>
    <section className="panel"><div className="panel-heading panel-heading--wrap"><div><span className="section-kicker">STOCK MONITOR</span><h2>Stock levels</h2><p>Products with 10 units or fewer need attention</p></div>
      <label className="toggle-filter"><input type="checkbox" checked={onlyLow} onChange={e => setOnlyLow(e.target.checked)}/> Low stock only</label></div>
      <div className="inventory-list">{sorted.map(p => <div className="inventory-row" key={p.id}><span className="stock-icon"><Package size={19}/></span>
        <div className="inventory-details"><strong>{p.name}</strong><small>{p.category} · {currency(p.price)}</small></div>
        <div className="inventory-meter"><div className="inventory-track"><div className={p.stock <= 10 ? 'fill-low' : 'fill-good'} style={{ width: `${Math.min(p.stock / 65 * 100, 100)}%` }}/></div>
          <span className={p.stock <= 10 ? 'low-label' : ''}>{p.stock} in stock</span></div></div>)}
        {sorted.length === 0 && <p className="muted-message padded">No products match this filter.</p>}</div>
      <div className="inventory-footer"><p>Need to update inventory? Edit a product's stock quantity in Product Management.</p>
        <button className="link-action" onClick={() => onNavigate('products')}>Go to products <ArrowRight size={16}/></button></div>
    </section>
  </div>;
}
