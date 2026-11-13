import { useSelector } from 'react-redux';
import { Activity, ArrowRight, Boxes, ClipboardList, IndianRupee, Package, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import MetricCard from '../components/MetricCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { currency, shortDay, shortDate } from '../utils/format.js';

export default function Overview({ onNavigate, overview }) {
  const { orders, products } = useSelector(state => state.commerce);
  if (!overview) return <div className="loading-card">Loading your store overview...</div>;

  const lowStock = products.filter(p => p.stock <= 10).sort((a, b) => a.stock - b.stock);
  return <div className="page-stack">
    <div className="welcome-banner"><div><span className="eyebrow">YOUR STORE AT A GLANCE</span>
      <h2>Keep your business moving.</h2><p>Explore sales, track orders, and stay ahead of inventory needs.</p></div>
      <div className="banner-graphic" aria-hidden="true"><span className="orb orb-1"/><span className="orb orb-2"/><TrendingUp size={58}/></div>
    </div>
    <div className="metrics-grid">
      <MetricCard label="Delivered revenue" value={currency(overview.revenue)} Icon={IndianRupee} theme="indigo" note="From delivered demo orders" />
      <MetricCard label="Total orders" value={overview.totalOrders.toLocaleString('en-IN')} Icon={ClipboardList} theme="green" note={`${overview.openOrders} awaiting progress`} />
      <MetricCard label="Active products" value={overview.totalProducts.toLocaleString('en-IN')} Icon={Package} theme="orange" note="Across all product categories" />
      <MetricCard label="Low-stock items" value={overview.lowStockCount.toLocaleString('en-IN')} Icon={Boxes} theme="rose" note="10 units remaining or fewer" />
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><span className="section-kicker">PERFORMANCE</span><h2>Revenue overview</h2><p>Delivered order revenue during the last 7 days</p></div>
        <span className="period-pill"><Activity size={14}/> Last 7 days</span></div>
        <div className="chart-box"><ResponsiveContainer width="100%" height="100%">
          <AreaChart data={overview.sales} margin={{ top: 16, right: 8, left: -16, bottom: 0 }}>
            <defs><linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#656cf4" stopOpacity={0.27}/><stop offset="100%" stopColor="#656cf4" stopOpacity={0.015}/></linearGradient></defs>
            <CartesianGrid strokeDasharray="4 7" stroke="#e9edf5" vertical={false}/>
            <XAxis dataKey="date" tickFormatter={shortDay} tickLine={false} axisLine={false} tick={{ fill: '#858ca1', fontSize: 12 }} dy={10}/>
            <YAxis tickFormatter={v => v >= 1000 ? `${Math.round(v / 1000)}k` : v} tickLine={false} axisLine={false} tick={{ fill: '#858ca1', fontSize: 12 }}/>
            <Tooltip formatter={v => [currency(v), 'Revenue']} labelFormatter={date => shortDate(`${date}T12:00:00Z`)} contentStyle={{ borderRadius: 12, border: '1px solid #e6e9f2', boxShadow: '0 14px 36px #1524461a' }}/>
            <Area type="monotone" dataKey="revenue" stroke="#5e63ec" strokeWidth={3} fill="url(#salesFill)" activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}/>
          </AreaChart>
        </ResponsiveContainer></div>
        <div className="chart-footnote">Average delivered order value: <strong>{currency(overview.avgOrderValue)}</strong></div>
      </section>
      <section className="panel stock-panel"><div className="panel-heading"><div><span className="section-kicker">INVENTORY</span><h2>Needs attention</h2><p>Products running low on stock</p></div>
        <span className="small-alert">{lowStock.length} alerts</span></div>
        <div className="stock-list">{lowStock.slice(0, 4).map(product => <div className="stock-item" key={product.id}>
          <span className="stock-icon"><Package size={18}/></span><div className="stock-item-details"><strong>{product.name}</strong><small>{product.category}</small></div>
          <div className="stock-right"><strong>{product.stock} left</strong><div className="stock-track"><div style={{ width: `${Math.min(product.stock / 10 * 100, 100)}%` }} /></div></div>
        </div>)}{lowStock.length === 0 && <p className="muted-message">All products have healthy stock levels.</p>}</div>
        <button className="link-action" onClick={() => onNavigate('inventory')}>View inventory <ArrowRight size={16}/></button>
      </section>
    </div>
    <section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">ACTIVITY</span><h2>Recent orders</h2><p>Latest order updates from your store</p></div>
      <button className="link-action" onClick={() => onNavigate('orders')}>View all orders <ArrowRight size={16}/></button></div>
      <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>PRODUCT</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
        <tbody>{orders.slice(0, 5).map(order => <tr key={order.id}>
          <td><strong>{order.id}</strong></td><td>{order.customer}</td><td>{order.productName}</td><td className="amount-cell">{currency(order.amount)}</td><td><StatusBadge status={order.status}/></td>
        </tr>)}</tbody></table></div>
    </section>
  </div>;
}
