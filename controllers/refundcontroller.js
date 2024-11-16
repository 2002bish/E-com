const Order = require('../models/orderModel');

// Process a refund request
exports.processRefund = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (order.status !== 'delivered') {
      return res.status(400).json({ error: 'Refund not applicable. Order not delivered.' });
    }

    // Implement refund logic (e.g., return payment to customer)
    order.status = 'canceled';
    await order.save();

    res.status(200).json({ message: 'Refund processed successfully', order });
  } catch (error) {
    res.status(400).json({ error: 'Error processing refund', details: error });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);
    if (order.status === 'canceled') {
      return res.status(400).json({ error: 'Order is already canceled' });
    }

    order.status = 'canceled';
    await order.save();

    res.status(200).json({ message: 'Order canceled successfully', order });
  } catch (error) {
    res.status(400).json({ error: 'Error canceling order', details: error });
  }
};
