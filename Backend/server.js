require("dotenv").config()


const express = require("express");
const app = express();

const cors = require("cors")
app.use(cors());

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const trainRoutes = require("./routes/train.routes");
const bookingRoutes = require("./routes/booking.routes");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", async function (req, res) {
  res.send("hello world")
})

const adminRoutes = require("./routes/admin.routes");

app.use("/api/admin", adminRoutes);

const contactRoutes = require("./routes/contact.routes");

app.use("/api/contact", contactRoutes);

const paymentRoutes = require("./routes/payment.routes");

app.use("/api/payment", paymentRoutes);

app.use('/api/auth',authRoutes);
app.use('/api/trains',trainRoutes);
app.use('/api/bookings',bookingRoutes);

const PORT = process.env.PORT || 8200;

app.listen(PORT, () => {
  console.log(`server is connected on port ${PORT}`);
});