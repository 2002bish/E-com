const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },  
  subject: { type: String, required: true },
  messages: [
    {
      sender: { type: String, enum: ['customer', 'support'], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  status: { type: String, enum: ['open', 'in progress', 'resolved', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
