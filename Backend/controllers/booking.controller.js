const Train = require("../Models/train");
const Booking = require("../Models/booking");

const generatePNR = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};


exports.bookTicket = async (req, res) => {
  try {
    const { trainId, passengers, travelClass, quota, journeyDate, source, destination } = req.body;
    const userId = req.user.id;
    if (!passengers || passengers.length === 0) {
      return res.status(400).json({
        message: "Passengers required"
      });
    }
    if (!source || !destination) {
      return res.status(400).json({
        message: "Source and destination required"
      });
    }
    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({
        message: "Train not found"
      });
    }
    //  Prevent booking for past date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(journeyDate);
    selectedDate.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return res.status(400).json({
        message: "Cannot book ticket for past date"
      });
    }
    //  Stop booking after departure time
    const currentDateTime = new Date();
    const journeyDateTime = new Date(journeyDate);
    // train departure time add karo journey date me
    const [hours, minutes] = train.departureTime.split(":");
    journeyDateTime.setHours(hours);
    journeyDateTime.setMinutes(minutes);
    journeyDateTime.setSeconds(0);
    if (currentDateTime > journeyDateTime) {
      return res.status(400).json({
        message: "Booking closed. Train already departed."
      });
    }
    if (
      train.seatsAvailable?.[travelClass]?.[quota] === undefined
    ) {
      return res.status(400).json({
        message: "Invalid class or quota"
      });
    }
    const sourceStation = train.stations.find(
      s => s.name.toLowerCase().includes(source.toLowerCase())
    );
    const destinationStation = train.stations.find(
      s => s.name.toLowerCase().includes(destination.toLowerCase())
    );
    if (!sourceStation || !destinationStation) {
      return res.status(400).json({
        message: "Invalid source or destination"
      });
    }
    if (
      destinationStation.distanceFromStart <=
      sourceStation.distanceFromStart
    ) {
      return res.status(400).json({
        message: "Destination must be after source"
      });
    }
    const distance =
      destinationStation.distanceFromStart -
      sourceStation.distanceFromStart;
    const totalFare =
      distance * train.pricePerKm * passengers.length;
    let status = "confirmed";
    let waitingNumber = null;
    const availableSeats =
      train.seatsAvailable[travelClass][quota];
    //  CONFIRMED CASE
    if (availableSeats >= passengers.length) {
      train.seatsAvailable[travelClass][quota] -=
        passengers.length;
      await train.save();
    }
    //  WAITING LIST CASE
    else {
      status = "waiting";
      const waitingCount = await Booking.countDocuments({ trainId, travelClass, quota, status: "waiting" });
      waitingNumber = waitingCount + 1;
    }
    const booking = new Booking({ userId, trainId, source, destination, distance, passengers, travelClass, quota, journeyDate, totalFare, status, waitingNumber, pnr: generatePNR()
    });
    await booking.save();
    res.status(201).json({
      message:
        status === "confirmed"
          ? "Ticket Confirmed "
          : `Added to Waiting List WL-${waitingNumber}`,
      booking
    });
  }
  catch (error) {
    res.status(500).json({
      message: "Error booking ticket",
      error: error.message
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    await Booking.updateMany(
  {
    journeyDate: { $lt: new Date() },
    status: "waiting"
  },
  {
    $set: { status: "cancelled" }
  }
);
    const bookings = await Booking.find({
      userId: req.user.id
    }).populate("trainId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message
    });
  }
};


exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action"
      });
    }
    if (booking.status === "cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled"
      });
    }
    const train = await Train.findById(booking.trainId);
    if (train && booking.status === "confirmed") {
      // seat restore
      train.seatsAvailable[booking.travelClass][booking.quota] +=
        booking.passengers.length;
      await train.save();
      // next waiting passenger auto-confirm
      const nextWaiting = await Booking.findOne({
        trainId: booking.trainId,
        travelClass: booking.travelClass,
        quota: booking.quota,
        journeyDate: booking.journeyDate,
        status: "waiting"
      }).sort({ createdAt: 1 });
      if (nextWaiting) {
        nextWaiting.status = "confirmed";
        nextWaiting.waitingNumber = null;
        await nextWaiting.save();
      }
    }
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json({
      message: "Booking cancelled successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error cancelling booking",
      error: error.message
    });
  }
};


exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const bookings = await Booking.find().populate("userId").populate("trainId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all bookings",
      error: error.message
    });
  }
};


exports.getWaitingBookingsByTrain = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const trainId = req.params.trainId;
    const waitingBookings = await Booking.find({
      trainId,
      status: "waiting"
    })
      .populate("userId", "name email")
      .sort({ waitingNumber: 1 });
    res.status(200).json(waitingBookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching waiting bookings",
      error: error.message
    });
  }
};


exports.getAllWaitingSummary = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const summary = await Booking.aggregate([
      { $match: { status: "waiting" } },
      {
        $group: {
          _id: { trainId: "$trainId", class: "$travelClass" },
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching waiting summary"
    });
  }
};