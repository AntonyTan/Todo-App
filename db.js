const Pool = require("pg").Pool;
require ("dotenv").config();


const devConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
}  

const proConfig = {
    connectionString: process.env.DATABASE_URL, //Connectionstring is string to connect to postgres, comes from heroku addon
    ssl: {
        rejectUnauthorized: false
    }
}   

const pool = new Pool(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
);

module.exports = pool;
