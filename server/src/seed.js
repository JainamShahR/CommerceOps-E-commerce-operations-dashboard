const catalog = [
  ['Wireless Headphones', 'Electronics', 3499, 26],
  ['Mechanical Keyboard', 'Electronics', 4299, 15],
  ['USB-C Hub', 'Electronics', 2299, 7],
  ['Ergonomic Desk Chair', 'Furniture', 12999, 8],
  ['Adjustable Desk Lamp', 'Furniture', 1799, 39],
  ['Laptop Stand', 'Accessories', 1899, 5],
  ['Everyday Backpack', 'Accessories', 2999, 22],
  ['Notebook Set', 'Stationery', 499, 64],
  ['Desk Organizer', 'Stationery', 899, 12],
  ['Water Bottle', 'Lifestyle', 1199, 44],
  ['Portable Charger', 'Electronics', 2499, 10],
  ['Laptop Sleeve', 'Accessories', 1499, 17],
];

const customers = [
  'Aarav Sharma', 'Diya Mehta', 'Kabir Singh', 'Ananya Rao', 'Ishaan Patel',
  'Meera Nair', 'Vivaan Shah', 'Riya Kapoor', 'Aditya Verma', 'Sara Khan',
  'Neha Joshi', 'Arjun Iyer', 'Tara Desai', 'Yash Gupta', 'Kiara Menon',
  'Nikhil Das', 'Pooja Kulkarni', 'Varun Bhat', 'Zoya Ali', 'Om Sinha',
];

function dateDaysAgo(daysAgo) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
}

function makeSeedData() {
  const products = catalog.map(([name, category, price, stock], idx) => ({
    id: `PRD-${String(idx + 101)}`,
    name,
    category,
    price,
    stock,
  }));

  const statuses = [
    'Delivered', 'Delivered', 'Delivered', 'Processing', 'Delivered',
    'Shipped', 'Delivered', 'Delivered', 'Pending', 'Delivered',
    'Delivered', 'Delivered', 'Shipped', 'Delivered', 'Delivered',
    'Processing', 'Delivered', 'Cancelled', 'Delivered', 'Pending',
  ];
  const orders = statuses.map((status, idx) => {
    const product = products[(idx * 7 + 2) % products.length];
    const quantity = (idx % 3) + 1;
    return {
      id: `ORD-${String(2401 + idx)}`,
      customer: customers[idx],
      productId: product.id,
      productName: product.name,
      quantity,
      amount: product.price * quantity,
      status,
      createdAt: dateDaysAgo(idx % 7),
    };
  });
  return { products, orders };
}

module.exports = { makeSeedData };
