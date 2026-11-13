const pool = require("../db/db");

async function getReviews(req, res) {
  const url = req.path;
  const id = Number(req.params.id);
  try {
    let result;
    if (!url.startsWith("/hotels/") && !url.startsWith("/tours/")) {
      return res.status(400).json({ message: "wrong path" });
    } else if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send();
    } else if (url.startsWith("/hotels/")) {
      result = await pool.query(
        "SELECT users.first_name, review.text, review.rating, hotel.name FROM review INNER JOIN users ON review.user_id = users.id INNER JOIN hotel ON review.hotel_id = hotel.id WHERE review.hotel_id = $1",
        [id],
      );
    } else if (url.startsWith("/tours/")) {
      result = await pool.query(
        "SELECT users.first_name, review.text, review.rating, tour.name FROM review INNER JOIN users ON review.user_id = users.id INNER JOIN tour ON review.tour_id = tour.id WHERE review.tour_id = $1",
        [id],
      );
    }
    if (result.rowCount !== 0) {
      return res.json(result.rows);
    } else {
      return res.status(200).json([]);
    }
  } catch (err) {
    console.error("getReviews error: ", err);
    res.status(500).send();
  }
}

async function postReview(req, res) {
  const user_id = 1;
  const url = req.path;
  const id = Number(req.params.id);
  const { text, rating } = req.body;
  let post_result;
  let get_result;
  try {
    if (!url.startsWith("/hotels/") && !url.startsWith("/tours/")) {
      return res.status(400).json({ message: "wrong path" });
    } else if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).send();
    } else if (text == null || text.trim() === "") {
      res.status(400).json({ message: "Text cannot be empty" });
    } else if (rating < 1 || rating > 5 || rating == null) {
      res.status(400).json({ message: "Incorrect rating value" });
    } else if (url.startsWith("/hotels/")) {
      post_result = await pool.query(
        "INSERT INTO review (text, rating, user_id, hotel_id, tour_id)VALUES($1, $2, $3, $4, $5) RETURNING *",
        [text, rating, user_id, id, null],
      );
    } else if (url.startsWith("/tours/")) {
      post_result = await pool.query(
        "INSERT INTO review (text, rating, user_id, hotel_id, tour_id)VALUES($1, $2, $3, $4, $5) RETURNING *",
        [text, rating, user_id, null, id],
      );
    }
    get_result = await pool.query(
      "SELECT review.id, review.text, review.rating, review.hotel_id, review.tour_id, users.first_name FROM review INNER JOIN users ON review.user_id = users.id WHERE review.id = $1",
      [post_result.rows[0].id],
    );
    if (get_result.rowCount !== 0) {
      res.json(get_result.rows[0]);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("postReview error: ", err);
    res.status(500).send();
  }
}

async function getAllReviews(req, res) {
  try {
    const result = await pool.query(
      "SELECT review.text, review.rating, review.hotel_id, review.tour_id, users.first_name FROM review INNER JOIN users ON review.user_id = users.id",
    );

    if (result.rowCount !== 0) {
      res.json(result.rows);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("getAllReviews error: ", err);
    res.status(500).send();
  }
}

module.exports = { postReview, getReviews, getAllReviews };
