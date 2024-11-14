const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');

// Ticket CRUD and messaging
router.post('/tickets', ticketController.createTicket);
router.get('/tickets', ticketController.getAllTickets);
router.post('/tickets/:ticketId/message', ticketController.addMessageToTicket);
router.patch('/tickets/:ticketId/status', ticketController.updateTicketStatus);
router.get('/tickets/order/:orderId', ticketController.getOrderDetails);

module.exports = router;
