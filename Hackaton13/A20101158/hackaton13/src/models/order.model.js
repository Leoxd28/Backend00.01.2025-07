const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: String, required: true },
  amount: { type: Number, required: true, min: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
