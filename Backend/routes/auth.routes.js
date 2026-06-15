const express = require("express");
const { getAllUsers,login, register ,getProfile,updateProfile} = require("../controllers/auth.controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth");


router.post('/login',login)
router.post('/register',register)
router.get("/users",authMiddleware, getAllUsers);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);


module.exports = router;