const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ error: 'Error creating order', details: error });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('items.product');
    res.status(200).json({ orders });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching orders', details: error });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer').populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching order', details: error });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(400).json({ error: 'Error updating order status', details: error });
  }
};

// Assign order to a delivery person
exports.assignOrderToDeliveryPerson = async (req, res) => {
  try {
    const { deliveryPersonId } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.assignedTo = deliveryPersonId;
    await order.save();
    res.status(200).json({ message: 'Order assigned to delivery person', order });
  } catch (error) {
    res.status(400).json({ error: 'Error assigning order', details: error });
  }
};

// Manage refunds and returns
exports.handleRefund = async (req, res) => {
  try {
    const { refundStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.refundStatus = refundStatus;
    await order.save();
    res.status(200).json({ message: 'Refund status updated', order });
  } catch (error) {
    res.status(400).json({ error: 'Error updating refund status', details: error });
  }
};
