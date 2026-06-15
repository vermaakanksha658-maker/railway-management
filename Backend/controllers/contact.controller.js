const Contact = require("../Models/contact");

exports.sendMessage = async (req, res) => {

  try {

    const {
      fullName,
      phone,
      email,
      message,
    } = req.body;

    if (
      !fullName ||
      !phone ||
      !email ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newMessage = await Contact.create({
      fullName,
      phone,
      email,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });

  }

};