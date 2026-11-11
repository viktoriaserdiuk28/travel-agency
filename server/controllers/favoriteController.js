const pool = require("../db/db");

async function getFavoriteHotel(req, res) {
  try {
    const result = await pool.query(
      "SELECT hotel.image_url, hotel.name, hotel.city, hotel.country, hotel.price, hotel.id AS hotel_id, users.id AS user_id FROM favorite INNER JOIN hotel ON favorite.hotel_id = hotel.id INNER JOIN users ON favorite.user_id = users.id",
    );

    res.json(result.rows);
  } catch (err) {
    console.error("gerFavorite error: ", err);
    res.status(500).send();
  }
}

async function getFavoriteTour(req, res) {
  try {
    const result = await pool.query(
      "SELECT tour.image_url, tour.name, tour.country, tour.price, tour.group_size, tour.id AS tour_id, users.id AS user_id FROM favorite INNER JOIN tour ON favorite.tour_id = tour.id INNER JOIN users ON favorite.user_id = users.id",
    );

    res.json(result.rows);
  } catch (err) {
    console.error("gerFavorite error: ", err);
    res.status(500).send();
  }
}

async function postFavoriteHotel(req, res) {
  const user_id = 1;
  const { hotel_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO favorite (user_id, hotel_id, tour_id) VALUES ($1, $2, $3) RETURNING*",
      [user_id, hotel_id, null],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("gerFavorite error: ", err);
    res.status(500).send();
  }
}

async function postFavoriteTour(req, res) {
  const user_id = 1;

  const { tour_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO favorite (user_id, hotel_id, tour_id) VALUES ($1, $2, $3) RETURNING*",
      [user_id, null, tour_id],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("gerFavorite error: ", err);
    res.status(500).send();
  }
}

async function deleteFavoriteTour(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM favorite WHERE tour_id = $1", [
      id,
    ]);
    if (result.rowCount !== 0) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
  } catch (err) {
    console.error("deleteFavoriteTour error: ", err);
  }
}
async function deleteFavoriteHotel(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM favorite WHERE hotel_id = $1",
      [id],
    );
    if (result.rowCount !== 0) {
      res.status(204).send();
    } else {
      res.status(500).send();
    }
  } catch (err) {
    console.error("deleteFavoriteHotel error: ", err);
  }
}
module.exports = {
  getFavoriteHotel,
  getFavoriteTour,
  postFavoriteTour,
  postFavoriteHotel,
  deleteFavoriteHotel,
  deleteFavoriteTour,
};
