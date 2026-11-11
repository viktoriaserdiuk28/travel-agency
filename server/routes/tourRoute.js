const express = require("express");
const {
  getTour,
  deleteTour,
  postTour,
  getTourById,
} = require("../controllers/tourController");
const router = express.Router();

router.get("/tours", getTour);
router.delete("/tours/:id", deleteTour);
router.post("/tours", postTour);
router.get("/tours/:id", getTourById);

module.exports = router;
