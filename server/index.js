const express = require('express');
const cors = require('cors');
const { loadData, saveData } = require('./src/db');
const { getOverview } = require('./src/analytics');
const { validateProduct, orderStatuses } = require('./src/validators');

const app = express();
app.use(cors());
app.use(express.json({ limit: '32kb' }));

const asyncRoute = handler => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'commerceops-api' }));

app.get('/api/overview', asyncRoute(async (req, res) => {
  const { products, orders } = await loadData();
  res.json(getOverview(products, orders));
}));

app.get('/api/products', asyncRoute(async (req, res) => {
  const { products } = await loadData();
  res.json(products);
}));

app.post('/api/products', asyncRoute(async (req, res) => {
  const { errors, value } = validateProduct(req.body || {});
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });
  const data = await loadData();
  const used = data.products.map(p => Number(p.id.replace('PRD-', ''))).filter(Number.isFinite);
  const nextId = Math.max(100, ...used) + 1;
  const product = { id: `PRD-${nextId}`, ...value };
  data.products.push(product);
  await saveData(data);
  return res.status(201).json(product);
}));

app.patch('/api/products/:id', asyncRoute(async (req, res) => {
  const { errors, value } = validateProduct(req.body || {}, true);
  if (errors.length) return res.status(400).json({ error: errors.join(', ') });
  const data = await loadData();
  const product = data.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  Object.assign(product, value);
  await saveData(data);
  return res.json(product);
}));

app.delete('/api/products/:id', asyncRoute(async (req, res) => {
  const data = await loadData();
  const before = data.products.length;
  data.products = data.products.filter(p => p.id !== req.params.id);
  if (data.products.length === before) return res.status(404).json({ error: 'Product not found' });
  await saveData(data);
  return res.status(204).send();
}));

app.get('/api/orders', asyncRoute(async (req, res) => {
  const { orders } = await loadData();
  res.json([...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
}));

app.patch('/api/orders/:id/status', asyncRoute(async (req, res) => {
  const status = req.body?.status;
  if (!orderStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid order status' });
  }
  const data = await loadData();
  const order = data.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  order.status = status;
  await saveData(data);
  return res.json(order);
}));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  console.error(err);
  return res.status(500).json({ error: 'Unexpected server error' });
});

const port = Number(process.env.API_PORT || 5000);
// Initialize demo storage before accepting simultaneous frontend requests.
loadData()
  .then(() => app.listen(port, () => {
    console.log(`CommerceOps API running at http://localhost:${port}`);
  }))
  .catch(error => {
    console.error('Could not initialize demo data:', error);
    process.exitCode = 1;
  });
