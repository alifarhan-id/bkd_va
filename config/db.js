const { Pool, Client } = require('pg')

require('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
    try{
        if(err === undefined){
            console.log("success connected to database")
        }
    }catch(e){
        console.log("failed connected to database : ", e)
    }

  })
module.exports = pool