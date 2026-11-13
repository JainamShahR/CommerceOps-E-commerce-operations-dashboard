const test = require('node:test');
const assert = require('node:assert/strict');
const { getOverview } = require('../src/analytics');
const { validateProduct } = require('../src/validators');

const referenceDate = new Date('2026-11-13T12:00:00.000Z');

test('revenue counts delivered orders only', () => {
  const result = getOverview(
    [{ stock: 3 }, { stock: 20 }],
    [
      { status: 'Delivered', amount: 300, createdAt: '2026-11-12T12:00:00.000Z' },
      { status: 'Pending', amount: 800, createdAt: '2026-11-13T12:00:00.000Z' },
    ],
    referenceDate
  );
  assert.equal(result.revenue, 300);
  assert.equal(result.totalOrders, 2);
  assert.equal(result.lowStockCount, 1);
  assert.equal(result.openOrders, 1);
  assert.equal(result.sales.length, 7);
});

test('product validation rejects negative stock', () => {
  const { errors } = validateProduct({ name: 'Test', category: 'Electronics', price: 100, stock: -1 });
  assert.ok(errors.some(error => error.includes('stock')));
});

test('valid products have normalized prices and names', () => {
  const { errors, value } = validateProduct({ name: '  Test  ', category: 'Accessories', price: 99.999, stock: 2 });
  assert.deepEqual(errors, []);
  assert.equal(value.name, 'Test');
  assert.equal(value.price, 100);
});
