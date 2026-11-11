const express = require("express");
const {
  getHotel,
  deleteHotel,
  postHotel,
  getHotelById,
} = require("../controllers/hotelController");
const router = express.Router();

router.get("/hotels", getHotel);
router.delete("/hotels/:id", deleteHotel);
router.post("/hotels", postHotel);
router.get("/hotels/:id", getHotelById);

module.exports = router;
