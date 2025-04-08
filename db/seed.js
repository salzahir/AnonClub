const {Client} = require('pg');
require('dotenv').config({ path: '../.env' });
const path = require('path');
const fs = require('fs');

// Function to check if the DATABASE_URL environment variable is set
function checkEnv(url) {
    if (!url) {
        console.error('DATABASE_URL environment variable is not set.');
        throw new Error('DATABASE_URL environment variable is not set.');
    }
}

async function connectQuery(client, sql) {
    try {
        await client.connect();
        console.log('Connected to the database');
        await client.query('DROP TABLE IF EXISTS users');
        await client.query('DROP TABLE IF EXISTS messages');
        console.log('Dropped existing tables');
        await client.query(sql);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await client.end();
        console.log('Database connection closed');
    }
}


function readSQLFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`${filePath} file not found.`);
        throw new Error(`${filePath} file not found.`);
    }
    return fs.readFileSync(filePath, 'utf8');
}

// Function to seed the database
async function seedDatabase() {
    const DATABASE_URL = process.env.DATABASE_URL;

    checkEnv(DATABASE_URL);

    const client = new Client({
        connectionString: DATABASE_URL,
    });

    const sqlFilePath = path.join(__dirname, 'schema.sql');
    const sql = readSQLFile(sqlFilePath);

    await connectQuery(client, sql);

}

// Call the seedDatabase function to execute the seeding process
seedDatabase();