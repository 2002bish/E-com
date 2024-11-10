
const mongoose = require("mongoose");
const orderSchema= new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    items:[{
        product: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    totalAmount: {type:Number, required: true},
    status: {type:String,enum:['pending','processed', 'delivered','canceled'], default: 'pending'},
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPerson', default: null },
  refundStatus: { type: String, enum: ['none', 'requested', 'approved', 'rejected'], default: 'none' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },


  deliveryPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPerson', default: null },
  deliveryStatus: { type: String, enum: ['not_assigned', 'in_transit', 'delivered'], default: 'not_assigned' },
  estimatedDeliveryTime: { type: Date },
  deliveryCompletedAt: { type: Date },

});
// Middleware to update `updatedAt` before saving
orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;