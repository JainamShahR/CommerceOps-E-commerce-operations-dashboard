import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipboardList, Search } from 'lucide-react';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { fetchOverview, updateOrderStatus } from '../features/commerceSlice.js';
import { currency, shortDate } from '../utils/format.js';

const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.commerce.orders);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All statuses');
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState('');

  const filtered = useMemo(() => orders.filter(order => {
    const q = query.toLowerCase();
    return (order.id.toLowerCase().includes(q) || order.customer.toLowerCase().includes(q) || order.productName.toLowerCase().includes(q)) &&
      (status === 'All statuses' || order.status === status);
  }), [orders, query, status]);

  async function changeStatus(order, nextStatus) {
    setSaving(order.id); setError('');
    try {
      await dispatch(updateOrderStatus({ id: order.id, status: nextStatus })).unwrap();
      dispatch(fetchOverview());
    } catch (err) { setError(err.message || 'Could not update status'); }
    finally { setSaving(null); }
  }

  return <div className="page-stack">
    <section className="panel table-panel"><div className="panel-heading"><div><span className="section-kicker">ORDER TRACKING</span><h2>Manage orders</h2><p>Update each order as it moves through fulfillment</p></div>
      <span className="period-pill"><ClipboardList size={15}/>{orders.length} total</span></div>
      <div className="toolbar"><label className="search-field"><Search size={18}/><input aria-label="Search orders" placeholder="Search order, customer, product..." value={query} onChange={e => setQuery(e.target.value)}/></label>
        <select className="filter-select" aria-label="Filter order status" value={status} onChange={e => setStatus(e.target.value)}>{['All statuses', ...statuses].map(s => <option key={s}>{s}</option>)}</select></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="table-scroll"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>PRODUCT</th><th>AMOUNT</th><th>STATUS</th><th>CHANGE STATUS</th></tr></thead>
        <tbody>{filtered.map(order => <tr key={order.id}><td><strong>{order.id}</strong><small className="table-subtext">{shortDate(order.createdAt)}</small></td><td>{order.customer}</td>
          <td>{order.productName}<small className="table-subtext">Qty: {order.quantity}</small></td><td className="amount-cell">{currency(order.amount)}</td>
          <td><StatusBadge status={order.status}/></td><td><select className="table-select" aria-label={`Update status for ${order.id}`} value={order.status} disabled={saving === order.id}
            onChange={e => changeStatus(order, e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div>
      {filtered.length === 0 && <EmptyState/>}
      <div className="table-footer">Showing {filtered.length} of {orders.length} orders · Demo statuses can be changed freely</div>
    </section>
  </div>;
}
