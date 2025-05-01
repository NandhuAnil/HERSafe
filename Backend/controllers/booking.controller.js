import Booking from "../models/booking.model.js";
import transporter from "../config/emailConfig.js"

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

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'HERSafe conselling request',
      html: `
        <h3>Hello ${virtualCounselling},</h3>
        <p>Request for the counselling.</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        ${note ? `<p><strong>Note:</strong> ${note}</p>` : ''}
        <p>Thank you for choosing us!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: 'Booking created and confirmation email sent successfully',
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
