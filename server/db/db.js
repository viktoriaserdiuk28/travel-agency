require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
});

pool
  .connect()
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error(("Database connection error: ", err));
  });

module.exports = pool;
