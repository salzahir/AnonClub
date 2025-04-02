const { Pool } = require('pg');
const dotenv = require('dotenv');

const connectionString = process.env.DATABASE_URL

if(!connectionString) {
    throw new Error('DATABASE_URL is not defined in .env file');
}

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;