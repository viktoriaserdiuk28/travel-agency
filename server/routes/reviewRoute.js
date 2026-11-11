const express = require("express");
const {
  postReview,
  getReviews,
  getAllReviews,
} = require("../controllers/reviewController");
const router = express.Router();

router.post("/hotels/:id/reviews", postReview);
router.get("/hotels/:id/reviews", getReviews);

router.post("/tours/:id/reviews", postReview);
router.get("/tours/:id/reviews", getReviews);

router.get("/reviews", getAllReviews);

module.exports = router;
