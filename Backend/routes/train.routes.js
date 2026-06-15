const express = require("express");
const router = express.Router();


const trainController = require("../controllers/train.controller");
const authMiddleware = require("../middleware/auth");

router.post("/add",authMiddleware, trainController.addTrain);
router.get("/search",trainController.searchTrain);

router.get("/", authMiddleware, trainController.getAllTrains);
router.put("/:id", authMiddleware, trainController.updateTrain);
router.get("/:id", authMiddleware, trainController.getTrainById);
router.delete("/:id", authMiddleware, trainController.deleteTrain);


module.exports = router;