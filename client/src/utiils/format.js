export const currency = amount =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);

export const shortDate = input => new Date(input).toLocaleDateString('en-IN', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
});

export const shortDay = input => new Date(`${input}T12:00:00.000Z`).toLocaleDateString('en-IN', {
  weekday: 'short', timeZone: 'UTC',
});
