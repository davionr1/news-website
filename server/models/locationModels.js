require('dotenv').config()
const pg_user = process.env.PG_USER
const pg_host = process.env.PG_HOST
const pg_db = process.env.PG_DB
const pg_pass = process.env.PG_PASS
const port = process.env.PORT
const Pool = require('pg').Pool
const pool = new Pool({
    host: pg_user,
    user: pg_host,
    database: pg_db,
    password: pg_pass,
    port: port,
});

const getLocations = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`SELECT * from locations`, (error, results) => {
            if (results) {
                resolve(results.rows);
            } else {
                reject(error)
            }
        })
    })
}

module.exports = {
    getLocations
}