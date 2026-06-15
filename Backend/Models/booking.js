const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Train",
    required: true
  },
  source: {
    type: String,
    required: true
  },

  destination: {
    type: String,
    required: true
  },

  distance: {
    type: Number
  },

  passengers: [
    {
      name: String,
      age: Number,
      gender: String,
      seatNumber: String
    }
  ],

  travelClass: {
    type: String,
    required: true
  },

  quota: {
    type: String,
    default: "General"
  },

  journeyDate: {
    type: Date,
    required: true
  },

  pnr: {
    type: String,
    unique: true
  },

  totalFare: Number,

  status: {
    type: String,
    enum: ["confirmed", "waiting", "cancelled"],
    default: "confirmed"
  }

}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);