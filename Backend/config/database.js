const mongoose = require('mongoose');

async function connectDB() {
  try {
    console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB atlas");
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
}

module.exports = connectDB;