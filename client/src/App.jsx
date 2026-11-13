import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Overview from './pages/Overview.jsx';
import Products from './pages/Products.jsx';
import Orders from './pages/Orders.jsx';
import Inventory from './pages/Inventory.jsx';
import { fetchOrders, fetchOverview, fetchProducts } from './features/commerceSlice.js';

export default function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const { overview, error } = useSelector(state => state.commerce);

  function reload() {
    dispatch(fetchOverview());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }

  useEffect(() => {
    // StrictMode in development can issue initial GETs twice; both are safe.
    dispatch(fetchOverview());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  return <div className="app-shell">
    <Sidebar active={page} onNavigate={setPage} mobileOpen={menuOpen} onClose={() => setMenuOpen(false)}/>
    <div className="main-shell">
      <Topbar page={page} onMenu={() => setMenuOpen(true)}/>
      <main className="content">
        {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={reload}>Retry loading</button></div>}
        {page === 'overview' && <Overview onNavigate={setPage} overview={overview}/>}
        {page === 'products' && <Products/>}
        {page === 'orders' && <Orders/>}
        {page === 'inventory' && <Inventory onNavigate={setPage}/>}
        <footer className="site-footer">CommerceOps · Demo project using sample store data · Not connected to a real business</footer>
      </main>
    </div>
  </div>;
}
