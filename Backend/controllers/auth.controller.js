
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const SECRET = "mysecretkey";


exports.register = async (req, res) => {

  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });

    if (existing) { return res.status(400).json({ message: "User already exists"}); }

    const hash = await bcrypt.hash(password, 10);
    
    const user = new User({name,email,password: hash,role: role || "passenger"});

    await user.save();

    res.json({ message: "Registered successfully" });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};


exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) { return res.status(400).json({ message: "User not found" }); }

    const match = await bcrypt.compare(password, user.password);

    if (!match) { return res.status(400).json({ message: "Invalid password" }); }

    const SECRET = "mysecretkey";

    const token = jwt.sign({ id: user._id, role: user.role}, SECRET, { expiresIn: "1d" });

    res.json({ message: "Login success", token, user: { id: user._id, name: user.name, email: user.email, role: user.role} });

  } catch (err) {

    res.status(500).json({ message: err.message });
  }
};


exports.getAllUsers = async (req, res) => {

  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied"
      });
    }

    const users = await User.find({ role: "passenger" })
      .select("-password");

    res.status(200).json(users);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }
};


exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: "Server Error"});
  }
};


exports.updateProfile = async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate( req.user.id, req.body, { new: true } );

    res.json({ message: "Profile updated successfully", updatedUser});

  } catch (error) {

    res.status(500).json({ message: "Update failed"});
  }
};