const Sales = require('../models/salesModel');
const Inventory = require('../models/inventoryModel');
const Delivery = require('../models/deliveryModel');
const Order = require('../models/orderModel');

// Sales reports based on time, category, location
exports.getSalesReport = async (req, res) => {
  try {
    const { startDate, endDate, category, location } = req.query;

    const query = {};
    if (startDate && endDate) query.saleDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    if (category) query.category = category;
    if (location) query.location = location;

    const salesData = await Sales.aggregate([
      { $match: query },
      { $group: { _id: "$category", totalSales: { $sum: "$totalPrice" }, totalQuantity: { $sum: "$quantity" } } }
    ]);

    res.status(200).json({ message: 'Sales report generated', data: salesData });
  } catch (error) {
    res.status(400).json({ error: 'Error generating sales report', details: error });
  }
};

// Inventory report for fast outgoing product and slow outgoing products
exports.getInventoryReport = async (req, res) => {
  try {
    const inventoryData = await Inventory.aggregate([
      {
        $lookup: {
          from: "sales",
          localField: "productId",
          foreignField: "productId",
          as: "salesData"
        }
      },
      {
        $addFields: {
          salesCount: { $size: "$salesData" }
        }
      },
      { $sort: { salesCount: -1 } }  
    ]);

    res.status(200).json({ message: 'Inventory report generated', data: inventoryData });
  } catch (error) {
    res.status(400).json({ error: 'Error generating inventory report', details: error });
  }
};

// Customer metrics such as frequent shoppers and average order values
exports.getCustomerMetrics = async (req, res) => {
  try {
    const customerMetrics = await Order.aggregate([
      {
        $group: {
          _id: "$customerId",
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
          averageOrderValue: { $avg: "$totalAmount" }
        }
      },
      { $sort: { totalOrders: -1 } }  
    ]);

    res.status(200).json({ message: 'Customer metrics generated', data: customerMetrics });
  } catch (error) {
    res.status(400).json({ error: 'Error generating customer metrics', details: error });
  }
};

// Delivery performance report for delivery personnel
exports.getDeliveryPerformanceReport = async (req, res) => {
  try {
    const deliveryPerformance = await Delivery.aggregate([
      {
        $group: {
          _id: "$deliveryPersonId",
          totalDeliveries: { $sum: 1 },
          onTimeDeliveries: { $sum: { $cond: [{ $eq: ["$deliveryStatus", "on time"] }, 1, 0] } },
          delayedDeliveries: { $sum: { $cond: [{ $eq: ["$deliveryStatus", "delayed"] }, 1, 0] } },
          failedDeliveries: { $sum: { $cond: [{ $eq: ["$deliveryStatus", "failed"] }, 1, 0] } }
        }
      }
    ]);

    
    res.status(200).json({ message: 'Delivery performance report generated', data: deliveryPerformance });
  } catch (error) {
    res.status(400).json({ error: 'Error generating delivery performance report', details: error });
  }
};
