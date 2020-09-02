const {
    Client
} = require('pg')

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST
})

module.exports = {
    client
}