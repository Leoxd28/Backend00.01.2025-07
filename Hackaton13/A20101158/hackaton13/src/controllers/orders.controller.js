const Order = require('../models/order.model');
const Joi = require('joi');

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  product: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('userId');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { error, value } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const order = new Order(value);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
