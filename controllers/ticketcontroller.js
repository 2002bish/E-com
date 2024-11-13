const Ticket = require('../models/ticketModel');
const Order = require('../models/orderModel');

// Create a new support ticket
exports.createTicket = async (req, res) => {
  try {
    const { customerId, orderId, subject, initialMessage } = req.body;
    const ticket = new Ticket({
      customerId,
      orderId,
      subject,
      messages: [{ sender: 'customer', message: initialMessage }]
    });
    await ticket.save();
    res.status(201).json({ message: 'Ticket created successfully', ticket });
  } catch (error) {
    res.status(400).json({ error: 'Error creating ticket', details: error });
  }
};

// Get all tickets for customer support dashboard
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('customerId orderId');
    res.status(200).json({ tickets });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving tickets', details: error });
  }
};

// Add a message to a ticket (for customer or support agent)
exports.addMessageToTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { sender, message } = req.body;

    const ticket = await Ticket.findById(ticketId);
    ticket.messages.push({ sender, message });
    ticket.updatedAt = Date.now();
    await ticket.save();

    res.status(200).json({ message: 'Message added to ticket', ticket });
  } catch (error) {
    res.status(400).json({ error: 'Error adding message to ticket', details: error });
  }
};

// Update ticket status
exports.updateTicketStatus = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(ticketId, { status, updatedAt: Date.now() }, { new: true });
    res.status(200).json({ message: 'Ticket status updated', ticket });
  } catch (error) {
    res.status(400).json({ error: 'Error updating ticket status', details: error });
  }
};

// Get order details for a ticket
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId).populate('customerId');
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ error: 'Error retrieving order details', details: error });
  }
};
