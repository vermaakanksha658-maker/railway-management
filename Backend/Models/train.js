const mongoose = require("mongoose");

const trainSchema = mongoose.Schema({

  trainNumber: {
    type: String,
    required: true,
    unique: true
  },

  trainName: {
    type: String,
    required: true
  },

  stations: [
    {
      name: { type: String, required: true },
      distanceFromStart: { type: Number, required: true }
    }
  ],

  departureTime: String,

  arrivalTime: String,

  runningDays: {
    type: [String],
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },

  seatsAvailable: {

    SL: {
      General: Number,
      Tatkal: Number,
      Ladies: Number,
      Senior: Number
    },

    "3A": {
      General: Number,
      Tatkal: Number,
      Ladies: Number,
      Senior: Number
    },

    "2A": {
      General: Number,
      Tatkal: Number,
      Ladies: Number,
      Senior: Number
    },

    "1A": {
      General: Number,
      Tatkal: Number,
      Ladies: Number,
      Senior: Number
    },

    CC: {
      General: Number,
      Tatkal: Number,
      Ladies: Number,
      Senior: Number
    }

  },

  quota: {
    type: [String],
    enum: ["General", "Tatkal", "Ladies", "Senior"]
  },

  pricePerKm: {
    type: Number,
    default: 2
  }

}, { timestamps: true });

const Train = mongoose.model("Train", trainSchema);

module.exports = Train;