const categories = ['Electronics', 'Furniture', 'Accessories', 'Stationery', 'Lifestyle'];
const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function validateProduct(body, partial = false) {
  const errors = [];
  const value = {};

  for (const field of ['name', 'category', 'price', 'stock']) {
    if (!partial && body[field] === undefined) errors.push(`${field} is required`);
  }
  if (body.name !== undefined) {
    if (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 80) {
      errors.push('name must be 1–80 characters');
    } else value.name = body.name.trim();
  }
  if (body.category !== undefined) {
    if (!categories.includes(body.category)) errors.push('invalid category');
    else value.category = body.category;
  }
  if (body.price !== undefined) {
    if (typeof body.price !== 'number' || !Number.isFinite(body.price) || body.price < 1) {
      errors.push('price must be a positive number');
    } else value.price = Math.round(body.price * 100) / 100;
  }
  if (body.stock !== undefined) {
    if (!Number.isInteger(body.stock) || body.stock < 0) errors.push('stock must be a non-negative integer');
    else value.stock = body.stock;
  }
  if (partial && Object.keys(value).length === 0 && errors.length === 0) errors.push('no valid fields supplied');
  return { errors, value };
}

module.exports = { categories, orderStatuses, validateProduct };
