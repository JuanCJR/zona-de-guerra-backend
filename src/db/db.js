import mysql  from "mysql";
import { promisify }  from "util";
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

export default pool;
