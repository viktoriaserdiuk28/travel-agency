const hotelRoute = require("./routes/hotelRoute");
const tourRoute = require("./routes/tourRoute");
const reviewRoute = require("./routes/reviewRoute");
const favoriteRoute = require("./routes/favoriteRoute");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", hotelRoute);
app.use("/", tourRoute);
app.use("/", reviewRoute);
app.use("/", favoriteRoute);

app.listen(3000, () => {
  console.log("Server has started!");
});
