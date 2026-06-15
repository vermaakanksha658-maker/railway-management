const Train = require("../Models/train");


exports.addTrain = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    let { trainNumber, trainName, stations, departureTime, arrivalTime, runningDays, seatsAvailable, quota, pricePerKm } = req.body;
    if (!trainNumber || !trainName || !stations || !seatsAvailable) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }
    if (stations.length < 2) {
      return res.status(400).json({
        message: "Minimum 2 stations required"
      });
    }
    if (!pricePerKm) {
      pricePerKm = 2;
    }
    const train = new Train({
      trainNumber, trainName, stations, departureTime, arrivalTime, runningDays, seatsAvailable, quota, pricePerKm });
    await train.save();
    res.status(201).json({
      message: "Train added successfully 🚆",
      train
    });
  } catch (error) {
    console.log("ADD TRAIN ERROR:", error);
    res.status(500).json({
      message: "Error adding train",
      error: error.message
    });
  }
};


exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching trains",
      error: error.message
    });
  }
};


exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) {
      return res.status(404).json({
        message: "Train not found"
      });
    }
    res.status(200).json(train);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching train",
      error: error.message
    });
  }
};


exports.updateTrain = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const updatedTrain = await Train.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrain) {
      return res.status(404).json({
        message: "Train not found"
      });
    }
    res.status(200).json({
      message: "Train updated successfully ",
      updatedTrain
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating train",
      error: error.message
    });
  }
};


exports.searchTrain = async (req, res) => {
  try {
    const { from, to, date, travelClass, quota } = req.query;
    if (!from || !to) {
      return res.status(400).json({
        message: "From and To required"
      });
    }
    const trains = await Train.find();
    const validTrains = trains.map(train => {
      const sourceStation = train.stations.find(
        s =>s.name.toLowerCase().includes(from.toLowerCase())
      );
      const destinationStation = train.stations.find(
        s => s.name.toLowerCase().includes(to.toLowerCase())
      );
      if (!sourceStation || !destinationStation) return null;
      if (
        sourceStation.distanceFromStart >=
        destinationStation.distanceFromStart
      ) return null;
      if (date && train.runningDays?.length) {
        const selectedDay =
          new Date(date).toLocaleDateString("en-US", {
            weekday: "short"
          });
        if (!train.runningDays.includes(selectedDay)) {
          return null;
        }
      }
      if (quota && train.quota?.length) {
        if (!train.quota.includes(quota)) {
          return null;
        }
      }
      if (travelClass) {
        if (!train.seatsAvailable?.[travelClass]) {
          return null;
        }
      }
      const distance =
        destinationStation.distanceFromStart -
        sourceStation.distanceFromStart;
      const fare =
        distance * train.pricePerKm;
      return { train, distance,
        fare
      };
    }).filter(Boolean);
    if (!validTrains.length) {
      return res.status(404).json({
        message: "No trains found"
      });
    }
    res.status(200).json(validTrains);
  } catch (error) {
    res.status(500).json({
      message: "Error searching trains",
      error: error.message
    });
  }
};


exports.deleteTrain = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) {
      return res.status(404).json({
        message: "Train not found"
      });
    }
    res.status(200).json({
      message: "Train deleted successfully "
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting train",
      error: error.message
    });
  }
};