require('dotenv').config()
const pg_user = process.env.PG_USER
const pg_host = process.env.PG_HOST
const pg_db = process.env.PG_DB
const pg_pass = process.env.PG_PASS
const port = process.env.PORT

const fs = require("fs");
const { Pool } = require("pg")
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("../data/worldcities.csv");
let csvData = [];
let csvStream = fastcsv.parse({ headers: true })

  .on("data", function (data) {
    csvData.push(data);
    data.population = Math.round(parseFloat(data.population))
  })

  .on("end", async function () {
    const pool = new Pool({
      host: "localhost",
      user: "postgres",
      database: "weather_app",
      password: "famshaw",
      port: 5432,
    });

    const client = await pool.connect();

    try {
      await client.query("BEGIN");
      await Promise.all(csvData.map(async (row) => {

        const query =
          "INSERT INTO locations (city, city_ascii, lat, lng, country, iso2, iso3, admin_name, capital, population, id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
        await client.query(query, Object.values(row));
      }));
      await client.query("COMMIT");
      console.log("Data inserted successfully");
    } catch (e) {
      await client.query("ROLLBACK");
      console.error("Error inserting data:", e);
    } finally {
      client.release();
    }
  });

stream.pipe(csvStream);
