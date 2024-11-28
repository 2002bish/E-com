const Notification = require('../models/notificationModel');
const Inventory = require('../models/inventoryModel');

// Send an order update notification
exports.sendOrderNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = await Notification.create({
      userId,
      message,
      notificationType: 'order'
    });

    res.status(200).json({ message: 'Order notification sent', notification });
  } catch (error) {
    res.status(400).json({ error: 'Error sending order notification', details: error });
  }
};

// Send a low inventory alert
exports.sendInventoryAlert = async (req, res) => {
  try {
    const lowStockProducts = await Inventory.find({ stockLevel: { $lt: 5}, lowStockAlert: false });

    for (const product of lowStockProducts) {
      await Notification.create({
        message: `Low stock alert for product ID: ${product.productId}`,
        notificationType: 'inventory'
      });
      
      // Update the product to avoid duplicate alerts
      product.lowStockAlert = true;
      await product.save();
    }

    res.status(200).json({ message: 'Inventory alerts sent', products: lowStockProducts });
  } catch (error) {
    res.status(400).json({ error: 'Error sending inventory alerts', details: error });
  }
};

// Send a customer notification for order status updates or feedback
exports.sendCustomerNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const notification = await Notification.create({
      userId,
      message,
      notificationType: 'customer'
    });

    res.status(200).json({ message: 'Customer notification sent', notification });
  } catch (error) {
    res.status(400).json({ error: 'Error sending customer notification', details: error });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });

    res.status(200).json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(400).json({ error: 'Error marking notification as read', details: error });
  }

};

