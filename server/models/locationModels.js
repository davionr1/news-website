require('dotenv').config()
const pg_user = process.env.PG_USER
const pg_host = process.env.PG_HOST
const pg_db = process.env.PG_DB
const pg_pass = process.env.PG_PASS
const port = process.env.PORT
const Pool = require('pg').Pool
const pool = new Pool({
    host: "localhost",
      user: "postgres",
      database: "weather_app",
      password: "famshaw",
      port: 5432,
});
const getLocations = (value) => {

    return new Promise((resolve, reject) => {
        // if (!value) {
        //     reject("No value provided");
        //     return;
        // }

        pool.query('SELECT * FROM locations WHERE city ILIKE $1', [`${value}%`], (error, result) => {
            // console.log(pool.query);
                resolve(result.rows);
                
                
            // if (error) {
            //     reject(error);
            // } else {
            //     console.log(pool.query);
            //     resolve(result.rows);
            // }
        });
    });
};

module.exports = {
    getLocations
}