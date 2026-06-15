const express = require("express");
const router = express.Router();

const {
  bookTicket,
  getMyBookings,
  cancelBooking,
  getAllBookings,
  getWaitingBookingsByTrain,
  getAllWaitingSummary
} = require("../controllers/booking.controller");

const auth = require("../middleware/auth");

// BOOK TICKET
router.post("/book", auth, bookTicket);

// GET MY BOOKINGS
router.get("/my", auth, getMyBookings);

// CANCEL BOOKING
router.delete("/:id", auth, cancelBooking);

// GET ALL BOOKINGS (ADMIN)
router.get("/all", auth, getAllBookings);

router.get(
  "/waiting/:trainId",
  auth,
  getWaitingBookingsByTrain
);

router.get(
  "/waiting-summary",
  auth,
  getAllWaitingSummary
);

module.exports = router;