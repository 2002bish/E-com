//customer support
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');

// Ticket CRUD and messaging
router.post("/create-tickets", ticketController.createTicket);
router.get("/get-tickets", ticketController.getAllTickets);
router.post("/ticket-message", ticketController.addMessageToTicket);
router.patch("/update-ticket-status", ticketController.updateTicketStatus);
router.get("/get-orderId", ticketController.getOrderDetails);

module.exports = router;
