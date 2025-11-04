export function validateUser(body) {
  const errors = [];
  if (!body || typeof body !== 'object') errors.push('body inválido');
  if (!body?.name || body.name.length < 2) errors.push('name requerido (>=2)');
  if (!body?.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email)) errors.push('email inválido');
  return errors;
}

export function validateOrder(body) {
  const errors = [];
  if (!Array.isArray(body?.items) || body.items.length === 0) errors.push('items requerido');
  if (!body?.customerId) errors.push('customerId requerido');
  return errors;
}
