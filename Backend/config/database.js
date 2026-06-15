const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/railwayapp');
    console.log('Connected to MongoDB');
}
module.exports = connectDB;