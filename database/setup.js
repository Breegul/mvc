// Creates the database tables
require("dotenv").config() // load env

// Imports
const fs = require("fs");
const db = require("./connect");

// Get the table definitions
const tableQuery = fs.readFileSync("./database/tables.sql").toString();
const seedQuery = fs.readFileSync("./database/seed.sql").toString();

// Create the tables
async function createTables() {
    await db.query(tableQuery); // send tables to database
    await db.query(seedQuery);
    db.end() // stop the pool
    console.log("Database ready.");
}

createTables();