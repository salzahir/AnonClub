const { Pool } = require('pg');
const dotenv = require('dotenv');

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/your_database_name';

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;