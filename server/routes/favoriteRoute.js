const express = require("express");
const {
  getFavoriteHotel,
  getFavoriteTour,
  postFavoriteTour,
  postFavoriteHotel,
  deleteFavoriteTour,
  deleteFavoriteHotel,
} = require("../controllers/favoriteController");
const route = express.Router();

route.get("/favorites/hotels", getFavoriteHotel);
route.get("/favorites/tours", getFavoriteTour);
route.post("/favorites/tours", postFavoriteTour);
route.post("/favorites/hotels", postFavoriteHotel);
route.delete("/favorites/hotels/:id", deleteFavoriteHotel);
route.delete("/favorites/tours/:id", deleteFavoriteTour);

module.exports = route;
