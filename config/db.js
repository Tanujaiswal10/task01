require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("MySQL pool connected successfully!!!");
    connection.release();
  } catch (err) {
    console.error("MySQL pool connection failed:", err.message);
  }
})();

module.exports = db;


// create table rate_limits(
//  id INT auto_increment primary key,
//  user_id varchar(100),
//  ip_address varchar(500),
//  request_count int default 1,
//  window_start timestamp);

// Create table ip_rate_limit(
// id int auto_increment primary key,
// ip_address varchar(50),
// request_count int default 1,
// window_start timestamp
// )