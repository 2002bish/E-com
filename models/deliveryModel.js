const mongoose = require('mongoose');

const deliveryPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['available', 'busy', 'offline'], default: 'available' },
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
  },
  assignedOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null },
  deliveryHistory: [{
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    deliveredAt: { type: Date }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);

module.exports = DeliveryPerson;
