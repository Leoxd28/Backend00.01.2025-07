exports.processPayment = async (req, res, next) => {
  try {
    // simulamos proceso "único"
    const { userId, amount } = req.body;
    const result = { userId, amount, status: 'success', timestamp: new Date().toISOString() };
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
