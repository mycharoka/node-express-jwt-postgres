require('dotenv').config();
const postgres = require('pg');


const config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
};

const pool = new postgres.Pool(config);

pool.on('connect', () => {
	console.log('Connection to Database SUCCESS!!');
});

module.exports = {
	pool
}