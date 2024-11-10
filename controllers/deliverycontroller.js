const DeliveryPerson = require ('../models/deliveryModel');
const Order = require ('../models/orderModel');

// Assign an order to a delivery person
exports.assignDelivery = async (req, res) => {
    try {
      const { orderId, deliveryPersonId, estimatedDeliveryTime } = req.body;
  
      const order = await Order.findById(orderId);
      const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);
  
      if (!order || !deliveryPerson) {
        return res.status(404).json({ error: 'Order or Delivery Person not found' });
      }
  
      order.deliveryPerson = deliveryPersonId;
      order.deliveryStatus = 'in_transit';
      order.estimatedDeliveryTime = estimatedDeliveryTime;
      await order.save();
  
      deliveryPerson.assignedOrder = orderId;
      deliveryPerson.status = 'busy';
      await deliveryPerson.save();
  
      res.status(200).json({ message: 'Order assigned to delivery person', order });
    } catch (error) {
      res.status(400).json({ error: 'Error assigning delivery', details: error });
    }
  };
  
  // Track delivery person in real-time
  exports.updateDeliveryLocation = async (req, res) => {
    try {
      const { deliveryPersonId, latitude, longitude } = req.body;
  
      const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);
      if (!deliveryPerson) {
        return res.status(404).json({ error: 'Delivery Person not found' });
      }
  
      deliveryPerson.location = { latitude, longitude };
      await deliveryPerson.save();
  
      res.status(200).json({ message: 'Delivery location updated', deliveryPerson });
    } catch (error) {
      res.status(400).json({ error: 'Error updating location', details: error });
    }
  };
  
  // Mark delivery as completed
  exports.completeDelivery = async (req, res) => {
    try {
      const { orderId, deliveryPersonId } = req.body;
  
      const order = await Order.findById(orderId);
      const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);
  
      if (!order || !deliveryPerson) {
        return res.status(404).json({ error: 'Order or Delivery Person not found' });
      }
  
      order.deliveryStatus = 'delivered';
      order.deliveryCompletedAt = Date.now();
      await order.save();
  
      deliveryPerson.deliveryHistory.push({ orderId, deliveredAt: Date.now() });
      deliveryPerson.status = 'available';
      deliveryPerson.assignedOrder = null;
      await deliveryPerson.save();
  
      res.status(200).json({ message: 'Delivery completed', order });
    } catch (error) {
      res.status(400).json({ error: 'Error completing delivery', details: error });
    }
  };
  
  // Generate delivery history report
  exports.getDeliveryHistory = async (req, res) => {
    try {
      const deliveryPersonId = req.params.deliveryPersonId;
      const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId).populate('deliveryHistory.orderId');
  
      if (!deliveryPerson) {
        return res.status(404).json({ error: 'Delivery Person not found' });
      }
  
      res.status(200).json({ deliveryHistory: deliveryPerson.deliveryHistory });
    } catch (error) {
      res.status(400).json({ error: 'Error fetching delivery history', details: error });
    }
  };
  
  
  
  
  
  
  
  
  
  
  