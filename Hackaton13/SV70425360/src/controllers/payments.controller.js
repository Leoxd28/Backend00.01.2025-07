export function createPayment(_req, res) {
  // Simulación de pago exitoso
  const payment = { id: 'pay_' + Math.random().toString(36).slice(2), status: 'confirmed', at: new Date().toISOString() };
  res.status(201).json(payment);
}
