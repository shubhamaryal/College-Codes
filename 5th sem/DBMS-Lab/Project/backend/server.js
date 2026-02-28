// ============================================================
// server.js - Main Entry Point for Hotel Management Backend
// ============================================================
//
// This file does 3 things:
//   1. Sets up Express with middleware (CORS, JSON parsing)
//   2. Connects the route files (/user/* and /admin/*)
//   3. Starts the server on port 8000
//
// To run: npm start (or npm run dev for auto-restart)
// ============================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load .env variables into process.env

// Import our route files
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Create the Express application
const app = express();

// ==================== MIDDLEWARE ====================

// CORS (Cross-Origin Resource Sharing):
// Both frontends run on different ports (5173 for customer, 5174 for admin).
// Browsers block requests between different ports by default.
// cors() tells the browser "it's okay, allow these requests".
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:5175",
        ],
        credentials: true, // Allow cookies and Authorization headers
    }),
);

// JSON Body Parser:
// When the frontend sends data (like login form data), it comes as JSON.
// express.json() parses that JSON so we can access it via req.body.
app.use(express.json());

// ==================== ROUTES ====================

// All customer-facing routes are prefixed with /user
// Examples: POST /user/login, GET /user/booking/rooms
app.use("/user", userRoutes);

// All admin-facing routes are prefixed with /admin
// Examples: POST /admin/login, GET /admin/rooms/getroomdetails
app.use("/admin", adminRoutes);

// Simple test route to check if the server is running
app.get("/", (req, res) => {
    res.json({ message: "Hotel Management Backend is running!" });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`\n===========================================`);
    console.log(`  Hotel Management Backend`);
    console.log(`  Server running on: http://localhost:${PORT}`);
    console.log(`===========================================\n`);
});
