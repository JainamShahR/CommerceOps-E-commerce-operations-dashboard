import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addProduct, fetchOverview, updateProduct } from '../features/commerceSlice.js';

const categories = ['Electronics', 'Furniture', 'Accessories', 'Stationery', 'Lifestyle'];
const initial = { name: '', category: 'Electronics', price: '', stock: '' };

export default function ProductModal({ product, onClose }) {
  const [values, setValues] = useState(product ? { ...product } : initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const editing = Boolean(product);

  useEffect(() => {
    function onEscape(event) { if (event.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [onClose]);

  async function submit(event) {
    event.preventDefault();
    setError('');
    const data = { name: values.name.trim(), category: values.category,
      price: Number(values.price), stock: Number(values.stock) };
    if (!data.name || data.price <= 0 || !Number.isInteger(data.stock) || data.stock < 0 || values.stock === '') {
      setError('Please enter a name, a positive price, and a valid stock quantity.');
      return;
    }
    setSaving(true);
    try {
      await dispatch(editing ? updateProduct({ id: product.id, ...data }) : addProduct(data)).unwrap();
      await dispatch(fetchOverview());
      onClose();
    } catch (err) { setError(err.message || 'Could not save product.'); }
    finally { setSaving(false); }
  }

  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-heading"><div><h2 id="modal-title">{editing ? 'Edit product' : 'Add a new product'}</h2><p>Keep your product details accurate and up to date.</p></div>
        <button className="icon-button" aria-label="Close" onClick={onClose}><X size={20}/></button></div>
      <form onSubmit={submit} className="modal-form">
        <label>Product name<input autoFocus required maxLength={80} value={values.name} onChange={e => setValues({ ...values, name: e.target.value })} placeholder="e.g. Wireless Speaker"/></label>
        <label>Category<select value={values.category} onChange={e => setValues({ ...values, category: e.target.value })}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select></label>
        <div className="form-two-col"><label>Price (₹)<input required type="number" min="1" step="0.01" value={values.price} onChange={e => setValues({ ...values, price: e.target.value })} placeholder="2499"/></label>
          <label>Stock units<input required type="number" min="0" step="1" value={values.stock} onChange={e => setValues({ ...values, stock: e.target.value })} placeholder="20"/></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-footer"><button type="button" className="button button--light" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={saving} className="button button--primary">{saving ? 'Saving...' : editing ? 'Save changes' : 'Add product'}</button></div>
      </form>
    </div>
  </div>;
}
