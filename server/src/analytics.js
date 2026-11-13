function dateKey(dateInput) {
  const date = new Date(dateInput);
  // Use the ISO UTC day for consistent grouped timestamps.
  return date.toISOString().slice(0, 10);
}

function getOverview(products, orders, now = new Date()) {
  const delivered = orders.filter(order => order.status === 'Delivered');
  const revenue = delivered.reduce((sum, order) => sum + order.amount, 0);
  const lowStockCount = products.filter(product => product.stock <= 10).length;
  const openOrders = orders.filter(order => ['Pending', 'Processing'].includes(order.status)).length;

  const salesByDay = new Map();
  for (let offset = 6; offset >= 0; offset--) {
    const d = new Date(now);
    d.setUTCHours(12, 0, 0, 0);
    d.setUTCDate(d.getUTCDate() - offset);
    const key = dateKey(d);
    salesByDay.set(key, { date: key, revenue: 0, orders: 0 });
  }

  delivered.forEach(order => {
    const key = dateKey(order.createdAt);
    if (salesByDay.has(key)) {
      const item = salesByDay.get(key);
      item.revenue += order.amount;
      item.orders += 1;
    }
  });

  return {
    revenue,
    totalOrders: orders.length,
    totalProducts: products.length,
    lowStockCount,
    openOrders,
    avgOrderValue: delivered.length ? Math.round(revenue / delivered.length) : 0,
    sales: Array.from(salesByDay.values()),
  };
}

module.exports = { getOverview };
