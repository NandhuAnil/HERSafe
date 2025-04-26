import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    virtualCounselling: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
