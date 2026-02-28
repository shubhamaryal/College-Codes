// ============================================================
// config/db.js - MySQL Database Connection
// ============================================================
//
// This creates a "connection pool" to MySQL.
//
// Why a pool?
//   - Instead of creating a new connection for every query
//     (which is slow), a pool keeps connections open and reuses them.
//   - Think of it like a parking lot with 10 spots. Cars (queries)
//     come and go, but the spots (connections) stay ready.
//
// We use mysql2/promise so we can use async/await syntax
// instead of callbacks.
// ============================================================

const mysql = require("mysql2/promise");
require("dotenv").config();

// Create the connection pool using settings from .env file
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // MySQL server address
    user: process.env.DB_USER || "root", // MySQL username
    password: process.env.DB_PASSWORD || "", // MySQL password
    database: process.env.DB_NAME || "hotel_management", // Database name

    // Pool configuration
    waitForConnections: true, // Wait if all connections are busy
    connectionLimit: 10, // Max 10 simultaneous connections
    queueLimit: 0, // No limit on waiting requests
});

// Test the connection when the app starts
pool.getConnection()
    .then((connection) => {
        console.log(
            "✓ Connected to MySQL database: " +
                (process.env.DB_NAME || "hotel_management"),
        );
        connection.release(); // Release the test connection back to the pool
    })
    .catch((err) => {
        console.error("✗ MySQL connection failed:", err.message);
        console.error(
            "  Make sure MySQL is running and .env credentials are correct.",
        );
    });

// Export the pool so other files can use it
module.exports = pool;