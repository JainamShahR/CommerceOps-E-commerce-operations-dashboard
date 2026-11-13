import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Plus, Search, Trash2, Package } from 'lucide-react';
import ProductModal from '../components/ProductModal.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { deleteProduct, fetchOverview } from '../features/commerceSlice.js';
import { currency } from '../utils/format.js';

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.commerce.products);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState('');

  const categories = useMemo(() => ['All categories', ...new Set(products.map(p => p.category))], [products]);
  const filtered = useMemo(() => products.filter(product =>
    product.name.toLowerCase().includes(query.trim().toLowerCase()) &&
    (category === 'All categories' || product.category === category)
  ), [products, query, category]);

  async function remove(product) {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
    setFeedback('');
    try {
      await dispatch(deleteProduct(product.id)).unwrap();
      dispatch(fetchOverview());
      setFeedback(`${product.name} deleted.`);
    } catch (err) { setFeedback(err.message); }
  }

  return <div className="page-stack">
    <section className="panel table-panel">
      <div className="panel-heading panel-heading--wrap"><div><span className="section-kicker">CATALOG</span><h2>All products</h2><p>{products.length} products in your store</p></div>
        <button className="button button--primary" onClick={() => setModal({ mode: 'add' })}><Plus size={17}/> Add product</button></div>
      <div className="toolbar"><label className="search-field"><Search size={18}/><input aria-label="Search products" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search product name..."/></label>
        <select className="filter-select" aria-label="Filter by category" value={category} onChange={e => setCategory(e.target.value)}>{categories.map(cat => <option key={cat}>{cat}</option>)}</select></div>
      {feedback && <p className="inline-feedback" role="status">{feedback}</p>}
      <div className="table-scroll"><table><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>PRICE</th><th>STOCK</th><th className="actions-heading">ACTIONS</th></tr></thead>
        <tbody>{filtered.map(product => <tr key={product.id}><td><div className="product-cell"><span className="mini-product-icon"><Package size={18}/></span><div><strong>{product.name}</strong><small>{product.id}</small></div></div></td>
          <td>{product.category}</td><td className="amount-cell">{currency(product.price)}</td><td><span className={`quantity-pill ${product.stock <= 10 ? 'quantity-pill--low' : ''}`}>{product.stock} units</span></td>
          <td><div className="table-actions"><button title={`Edit ${product.name}`} aria-label={`Edit ${product.name}`} className="icon-button" onClick={() => setModal({ mode: 'edit', product })}><Pencil size={17}/></button>
            <button title={`Delete ${product.name}`} aria-label={`Delete ${product.name}`} className="icon-button icon-button--danger" onClick={() => remove(product)}><Trash2 size={17}/></button></div></td></tr>)}</tbody>
      </table></div>
      {filtered.length === 0 && <EmptyState/>}
      <div className="table-footer">Showing {filtered.length} of {products.length} products</div>
    </section>
    {modal && <ProductModal product={modal.product} onClose={() => setModal(null)}/>}
  </div>;
}
