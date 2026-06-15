const razorpay = require("../config/razorpay");

exports.createOrder = async (req, res) => {

  try {

    const { ticketPrice, quantity } = req.body;

const totalAmount = ticketPrice * quantity;


    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(
      options
    );

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};