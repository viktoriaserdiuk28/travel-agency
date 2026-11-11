const pool = require("../db/db");

async function getTour(req, res) {
  try {
    const result = await pool.query("SELECT * FROM tour");
    res.json(result.rows);
  } catch (err) {
    console.error("getTour error: ", err);
    res.status(500).send();
  }
}

async function deleteTour(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM tour WHERE id = $1", [id]);
    if (result.rowCount !== 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("deleteTour error: ", err);
    res.status(500).send();
  }
}

async function postTour(req, res) {
  const {
    name,
    country,
    group_size,
    min_age,
    max_age,
    price,
    duration,
    rate,
    image_url,
  } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO tour (name, country, group_size, min_age, max_age, price, duration, rate, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING*",
      [
        name,
        country,
        group_size,
        min_age,
        max_age,
        price,
        duration,
        rate,
        image_url,
      ],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("createTour error: ", err);
    res.status(500).send();
  }
}

async function getTourById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM tour WHERE id = $1", [id]);
    if (result.rowCount !== 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("getTourById error: ", err);
    res.status(500).send();
  }
}

module.exports = { getTour, deleteTour, postTour, getTourById };
