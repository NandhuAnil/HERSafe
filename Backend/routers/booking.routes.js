import express from "express";
import { createBooking, getUserBookings } from '../controllers/booking.controller.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/create', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);

export default router;
