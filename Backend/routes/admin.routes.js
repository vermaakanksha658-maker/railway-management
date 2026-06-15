const express = require("express");

const authMiddleware = require("../middleware/auth");
const roleMiddleware = require("../middleware/role");

const router = express.Router();

router.get("/dashboard",authMiddleware,roleMiddleware("admin"),(req, res) => {

    res.json({message: "Welcome Admin",user: req.user
    });

  }
);

module.exports = router;