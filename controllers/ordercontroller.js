const Order = require('../models/orderModel');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id, // Explicitly include order ID
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error creating order',
      details: error.message || error,
    });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer', 'name email') // Populate specific fields for efficiency
      .populate('items.product', 'name price'); // Populate product details
    res.status(200).json({
      message: "Orders fetched successfully",
      count: orders.length, // Include count for convenience
      orders,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error fetching orders',
      details: error.message || error,
    });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('items.product', 'name price');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error fetching order',
      details: error.message || error,
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processed', 'delivered', 'canceled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();
    res.status(200).json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error updating order status',
      details: error.message || error,
    });
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
    res.status(200).json({
      message: 'Order assigned to delivery person successfully',
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error assigning order to delivery person',
      details: error.message || error,
    });
  }
};

// Manage Refunds and Returns
exports.handleRefund = async (req, res) => {
  try {
    const { refundStatus } = req.body;
    const validRefundStatuses = ['none', 'requested', 'approved', 'rejected'];

    if (!validRefundStatuses.includes(refundStatus)) {
      return res.status(400).json({ error: 'Invalid refund status' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.refundStatus = refundStatus;
    await order.save();
    res.status(200).json({
      message: 'Refund status updated successfully',
      order,
    });
  } catch (error) {
    res.status(400).json({
      error: 'Error updating refund status',
      details: error.message || error,
    });
  }
};
