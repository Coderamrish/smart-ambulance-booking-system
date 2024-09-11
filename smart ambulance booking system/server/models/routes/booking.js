// server/routes/booking.js
const express = require('express');
const { makeBooking } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST /api/booking
// @desc    Make a booking
router.post('/', authMiddleware, makeBooking);

module.exports = router;
