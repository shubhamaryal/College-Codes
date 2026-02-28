// ============================================================
// routes/userRoutes.js - Customer-Facing API Routes
// ============================================================
//
// These routes handle everything the CUSTOMER frontend needs:
//   - POST /user/signup         → Register a new account
//   - POST /user/login          → Login to existing account
//   - PATCH /user/updatepassword → Change password
//   - GET  /user/booking/rooms   → View available rooms
//   - POST /user/booking/create  → Book a room
//   - GET  /user/bookinghistory  → View past bookings
//   - GET  /user/bookings/:id    → View single booking
//
// Authentication is simple:
//   - On login/signup, backend returns the user's id
//   - Frontend stores it in localStorage as "userId"
//   - For protected routes, frontend sends userId in the request
//
// All routes are prefixed with /user (set in server.js)
// ============================================================

const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ============================================================
// POST /user/signup - Register a new customer account
// ============================================================
// Request body: { fullName, email, phoneNumber, password }
// Response:     { message, userId }
// ============================================================
router.post("/signup", async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password } = req.body;

        // Make sure all required fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "Full name, email, and password are required.",
            });
        }

        // Check if email is already taken
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email = ?",
            [email],
        );
        if (existing.length > 0) {
            return res.status(400).json({
                message: "An account with this email already exists.",
            });
        }

        // Insert the new user (password stored as plain text — this is fine for a college project)
        const [result] = await pool.query(
            "INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)",
            [fullName, email, phoneNumber || null, password],
        );

        // Send back the user's id so the frontend can store it
        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error during signup." });
    }
});

// ============================================================
// POST /user/login - Login an existing customer
// ============================================================
// Request body: { email, password }
// Response:     { message, userId, userName, userPhone }
//
// How it works:
//   1. Find user by email in the database
//   2. Check if the password matches (simple string comparison)
//   3. If yes, send back the user's id and info
// ============================================================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }

        // Find the user by email
        const [users] = await pool.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        const user = users[0];

        // Simple password check — just compare the strings
        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Send back user info. Frontend stores these in localStorage.
        res.json({
            message: "Login successful",
            userId: user.id,
            userName: user.full_name,
            userPhone: user.phone,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

// ============================================================
// PATCH /user/updatepassword - Change password
// ============================================================
// Request body: { userId, currentPassword, newPassword }
// Response:     { message }
// ============================================================
router.patch("/updatepassword", async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({
                message:
                    "User ID, current password, and new password are required.",
            });
        }

        // Get user's current password from database
        const [users] = await pool.query(
            "SELECT password FROM users WHERE id = ?",
            [userId],
        );
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the current password matches
        if (users[0].password !== currentPassword) {
            return res.status(400).json({
                message: "Current password is incorrect.",
            });
        }

        // Update to the new password
        await pool.query("UPDATE users SET password = ? WHERE id = ?", [
            newPassword,
            userId,
        ]);

        res.json({ message: "Password updated successfully." });
    } catch (error) {
        console.error("Update password error:", error);
        res.status(500).json({
            message: "Server error while updating password.",
        });
    }
});

// ============================================================
// GET /user/booking/rooms - Get all available rooms
// ============================================================
// PUBLIC route — no login needed, anyone can browse rooms
// Response: { success: true, data: [...rooms] }
// ============================================================
router.get("/booking/rooms", async (req, res) => {
    try {
        const [rooms] = await pool.query(
            "SELECT * FROM rooms WHERE is_available = TRUE ORDER BY room_type, room_number",
        );

        // Format each room for the customer frontend
        const formattedRooms = rooms.map((room) => {
            let amenitiesObj = {};
            try {
                amenitiesObj = JSON.parse(room.amenities || "{}");
            } catch (e) {
                amenitiesObj = {};
            }

            return {
                id: room.id,
                roomNumber: room.room_number,
                title: room.room_name,
                roomName: room.room_name,
                roomType: room.room_type,
                description: room.description,
                price: room.price,
                imageUrl: room.image_url || "/images/room-placeholder.jpg",
                isAvailable: room.is_available,
                // Occupancy as object — the room detail pages access .maxOccupancy, .adult, etc.
                occupancy: {
                    maxOccupancy: room.max_occupancy || 2,
                    adult: room.max_occupancy || 2,
                    children: 0,
                },
                // Raw amenities object — the room detail pages read .wifi, .beds.king, etc.
                amenities: amenitiesObj,
                // Hardcoded ratings — no review system in this project
                rating: "4.5",
                ratingText: "Excellent",
                ratingBg: "bg-green-100",
                ratingColor: "text-green-500",
                reviews: "120",
            };
        });

        res.json({ success: true, data: formattedRooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch rooms.",
        });
    }
});

// ============================================================
// POST /user/booking/create - Create a new booking
// ============================================================
// Request body: { userId, roomId, checkIn, checkOut, guests,
//                 firstName, lastName, phone, email,
//                 paymentMethod, totalAmount }
// Response:     { message, bookingId }
// ============================================================
router.post("/booking/create", async (req, res) => {
    try {
        const {
            userId, // From localStorage (stored at login time)
            roomId, // Database ID of the room being booked
            checkIn, // Check-in date (YYYY-MM-DD)
            checkOut, // Check-out date (YYYY-MM-DD)
            guests, // Number of guests
            firstName,
            lastName,
            phone,
            email,
            paymentMethod, // "cc", "paypal", or "cash"
            totalAmount,
        } = req.body;

        // Validate required fields
        if (!roomId || !checkIn || !checkOut || !firstName || !lastName) {
            return res.status(400).json({
                message: "Missing required booking fields.",
            });
        }

        // Check if the room exists
        const [rooms] = await pool.query("SELECT * FROM rooms WHERE id = ?", [
            roomId,
        ]);
        if (rooms.length === 0) {
            return res.status(404).json({ message: "Room not found." });
        }

        // Map frontend payment names to database enum values
        let dbPaymentMethod = "cash";
        if (paymentMethod === "cc" || paymentMethod === "credit_card") {
            dbPaymentMethod = "credit_card";
        } else if (paymentMethod === "paypal") {
            dbPaymentMethod = "paypal";
        }

        const customerName = `${firstName} ${lastName}`;
        const amount = totalAmount || rooms[0].price;

        // Insert the booking
        const [result] = await pool.query(
            `INSERT INTO bookings
        (user_id, room_id, check_in, check_out, guests, customer_name,
         customer_email, customer_phone, total_amount, payment_method, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
            [
                userId || null,
                roomId,
                checkIn,
                checkOut,
                guests || 1,
                customerName,
                email,
                phone,
                amount,
                dbPaymentMethod,
            ],
        );

        // Mark the room as unavailable (booked)
        await pool.query("UPDATE rooms SET is_available = FALSE WHERE id = ?", [
            roomId,
        ]);

        res.status(201).json({
            message: "Booking created successfully!",
            bookingId: result.insertId,
        });
    } catch (error) {
        console.error("Create booking error:", error);
        res.status(500).json({
            message: "Server error while creating booking.",
        });
    }
});

// ============================================================
// GET /user/bookinghistory?userId=1 - Get user's booking history
// ============================================================
// The userId is sent as a query parameter in the URL
// Response: [ { id, roomType, checkIn, checkOut, amount, status } ]
// ============================================================
router.get("/bookinghistory", async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: "userId is required." });
        }

        // JOIN with rooms table to get room name and type
        const [bookings] = await pool.query(
            `SELECT
         b.id, b.check_in, b.check_out, b.guests,
         b.customer_name, b.total_amount, b.payment_method,
         b.status, b.created_at,
         r.room_name, r.room_type, r.room_number
       FROM bookings b
       LEFT JOIN rooms r ON b.room_id = r.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
            [userId],
        );

        // Format for the Profile page's booking history table
        const formatted = bookings.map((b) => ({
            id: String(b.id),
            bookingId: String(b.id),
            roomType: b.room_type,
            roomName: b.room_name,
            roomNumber: b.room_number,
            checkIn: b.check_in,
            checkOut: b.check_out,
            amount: b.total_amount,
            totalAmount: b.total_amount,
            status: b.status,
            paymentMethod: b.payment_method,
            createdAt: b.created_at,
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching booking history:", error);
        res.status(500).json({ message: "Failed to fetch booking history." });
    }
});

// ============================================================
// GET /user/bookings/:id?userId=1 - Get single booking details
// ============================================================
// URL param: id (booking id)
// Query param: userId (to verify this booking belongs to this user)
// ============================================================
router.get("/bookings/:id", async (req, res) => {
    try {
        const userId = req.query.userId;
        const bookingId = req.params.id;

        const [bookings] = await pool.query(
            `SELECT
         b.*, r.room_name, r.room_type, r.room_number, r.price as room_price
       FROM bookings b
       LEFT JOIN rooms r ON b.room_id = r.id
       WHERE b.id = ? AND b.user_id = ?`,
            [bookingId, userId],
        );

        if (bookings.length === 0) {
            return res.status(404).json({ message: "Booking not found." });
        }

        const b = bookings[0];
        res.json({
            id: String(b.id),
            roomType: b.room_type,
            roomName: b.room_name,
            roomNumber: b.room_number,
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            customerName: b.customer_name,
            customerEmail: b.customer_email,
            customerPhone: b.customer_phone,
            totalAmount: b.total_amount,
            paymentMethod: b.payment_method,
            status: b.status,
            createdAt: b.created_at,
        });
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({ message: "Failed to fetch booking details." });
    }
});

module.exports = router;
