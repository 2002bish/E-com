//customer support
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');
const {authMiddleware}= require ("../middlewares/authMiddleware")

// Ticket CRUD and messaging
router.post("/create", ticketController.createTicket);
router.get("/get", ticketController.getAllTickets);
router.post("/:ticketId/message", ticketController.addMessageToTicket);
router.patch("/:ticketId/status", ticketController.updateTicketStatus);
router.get("/order/:orderId", ticketController.getOrderDetails);

module.exports = router;
