const pool = require("../db/db");

async function getHotel(req, res) {
  try {
    const result = await pool.query("SELECT * FROM hotel");
    res.json(result.rows);
  } catch (err) {
    console.error("getHotel error: ", err);
    res.status(500).send();
  }
}

async function deleteHotel(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM hotel WHERE id = $1", [id]);
    if (result.rowCount !== 0) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("deleteHotel error: ", err);
    res.status(500).send();
  }
}

async function postHotel(req, res) {
  const { name, country, city, max_guests, price, rate, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO hotel (name, country, city, max_guests, price, rate, image_url ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*",
      [name, country, city, max_guests, price, rate, image_url],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("postHotel error: ", err);
    res.status(500).send();
  }
}

async function getHotelById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM hotel WHERE id = $1", [id]);
    if (result.rowCount !== 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    console.error("postHotel error: ", err);
    res.status(500).send();
  }
}

module.exports = { getHotel, deleteHotel, postHotel, getHotelById };
