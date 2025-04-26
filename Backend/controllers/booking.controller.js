import Booking from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  try {
    const { userName, email, date, time, virtualCounselling, note } = req.body;

    if (!userName || !email || !date || !time || !virtualCounselling) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const userId = req.user.id;

    const booking = new Booking({
      userId,
      userName,
      email,
      date,
      time,
      virtualCounselling,
      note,
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    console.error('Create booking error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ userId });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};
