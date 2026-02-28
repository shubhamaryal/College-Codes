// ============================================================
// routes/adminRoutes.js - Admin Panel API Routes
// ============================================================
//
// These routes handle everything the ADMIN frontend needs:
//
//   ROOMS:
//     GET    /admin/rooms/getroomdetails              → Get all rooms
//     GET    /admin/rooms/filterroom                   → Filter rooms
//     POST   /admin/rooms/addroom                      → Add a new room
//     GET    /admin/rooms/updateroomdetails/:roomNumber → Get single room
//     PATCH  /admin/rooms/updateroomdetails/:roomNumber → Update a room
//     DELETE /admin/rooms/deleteroom/:roomNumber        → Delete a room
//
//   BOOKINGS:
//     GET    /admin/bookings/getbookinghistory         → Get all bookings
//     PATCH  /admin/bookings/updatebooking/:id         → Update booking
//     DELETE /admin/bookings/deletebooking/:id         → Delete booking
//
//   USERS (Customers):
//     GET    /admin/users/getallusers                  → Get all users
//     PATCH  /admin/users/updateuser/:id               → Update a user
//     DELETE /admin/users/deleteuser/:id               → Delete a user
//
//   STAFF:
//     GET    /admin/staff/getstaffdetails              → Get all staff
//     POST   /admin/staff/addstaff                     → Add staff member
//     PATCH  /admin/staff/updatestaffdetails/:staffId  → Update staff
//     DELETE /admin/staff/deletestaff/:staffId          → Delete staff
//
// All routes are prefixed with /admin (set in server.js)
// ============================================================

const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// ============================================================
// Helper: Format a MySQL room row for the admin frontend
// Converts snake_case DB columns to camelCase JS objects
// ============================================================
function formatRoomForAdmin(room) {
    // Parse the JSON amenities string
    let amenitiesObj = {};
    try {
        amenitiesObj = JSON.parse(room.amenities || "{}");
    } catch (e) {
        amenitiesObj = {};
    }

    return {
        roomNumber: String(room.room_number),
        roomName: room.room_name,
        roomType: room.room_type,
        description: room.description || "",
        price: String(room.price),
        isAvailable: Boolean(room.is_available),
        // Admin frontend uses "status" to show available/occupied badge
        status: room.is_available ? "available" : "occupied",
        occupancy: {
            maxOccupancy: room.max_occupancy || 2,
            adult: room.max_occupancy || 2,
            children: 0,
        },
        amenities: amenitiesObj,
        imageUrl: room.image_url || "",
        createdAt: room.created_at,
    };
}

// ================================================================
//                      ADMIN LOGIN
// ================================================================

// ============================================================
// POST /admin/login - Admin/Manager login
// ============================================================
// Request body: { username, password }
// Response:     { message, token, name }
// ============================================================
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required.",
            });
        }

        // Find admin by username in the database
        const [admins] = await pool.query(
            "SELECT * FROM admins WHERE username = ?",
            [username],
        );

        if (admins.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password.",
            });
        }

        const admin = admins[0];

        // Simple password check — just compare the strings
        if (admin.password !== password) {
            return res.status(401).json({
                message: "Invalid username or password.",
            });
        }

        // Send back admin info (no token needed for college project)
        res.json({
            message: "Admin login successful",
            adminId: admin.id,
            name: admin.name,
        });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Server error during login." });
    }
});

// ================================================================
//                        ROOM ROUTES
// ================================================================

// ============================================================
// GET /admin/rooms/getroomdetails - Get ALL rooms
// ============================================================
// Used by: Dashboard (to calculate stats) and Room Management
// Response: Array of room objects
// ============================================================
router.get("/rooms/getroomdetails", async (req, res) => {
    try {
        const [rooms] = await pool.query(
            "SELECT * FROM rooms ORDER BY room_number",
        );

        // Format each room for the admin frontend
        const formatted = rooms.map((room) => formatRoomForAdmin(room));
        res.json(formatted);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ message: "Failed to fetch rooms." });
    }
});

// ============================================================
// GET /admin/rooms/filterroom - Get rooms with optional filters
// ============================================================
// Query params: ?roomType=Classic&status=available
// Response:     Array of room objects (filtered)
// ============================================================
router.get("/rooms/filterroom", async (req, res) => {
    try {
        const { roomType, status } = req.query;

        // Start with base query, then add filters dynamically
        let query = "SELECT * FROM rooms WHERE 1=1";
        const params = [];

        // Filter by room type if provided
        if (roomType && roomType !== "all") {
            query += " AND room_type = ?";
            params.push(roomType);
        }

        // Filter by availability status if provided
        if (status && status !== "all") {
            if (status === "available") {
                query += " AND is_available = TRUE";
            } else if (status === "occupied" || status === "reserved") {
                query += " AND is_available = FALSE";
            }
        }

        query += " ORDER BY room_number";

        const [rooms] = await pool.query(query, params);
        const formatted = rooms.map((room) => formatRoomForAdmin(room));
        res.json(formatted);
    } catch (error) {
        console.error("Error filtering rooms:", error);
        res.status(500).json({ message: "Failed to filter rooms." });
    }
});

// ============================================================
// POST /admin/rooms/addroom - Add a new room
// ============================================================
// Request body: { roomNumber, roomName, roomType, description,
//                 price, isAvailable, occupancy, amenities }
// Response:     { message, roomId }
// ============================================================
router.post("/rooms/addroom", async (req, res) => {
    try {
        const {
            roomNumber,
            roomName,
            roomType,
            description,
            price,
            isAvailable,
            status,
            occupancy,
            amenities,
        } = req.body;

        // Validate required fields
        if (!roomNumber || !roomName || !price) {
            return res.status(400).json({
                message: "Room number, name, and price are required.",
            });
        }

        // Store amenities object as a JSON string in the database
        const amenitiesJson = amenities ? JSON.stringify(amenities) : null;
        const maxOccupancy = occupancy?.maxOccupancy || 2;

        // Determine availability from either isAvailable or status field
        let available = isAvailable !== false;
        if (status === "occupied" || status === "maintenance") {
            available = false;
        }

        const [result] = await pool.query(
            `INSERT INTO rooms
        (room_number, room_name, room_type, description, price,
         is_available, max_occupancy, amenities)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                roomNumber,
                roomName,
                roomType || "Classic",
                description || "",
                price,
                available,
                maxOccupancy,
                amenitiesJson,
            ],
        );

        res.status(201).json({
            message: "Room added successfully",
            roomId: result.insertId,
        });
    } catch (error) {
        console.error("Error adding room:", error);
        // Handle duplicate room number error
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "A room with this number already exists.",
            });
        }
        res.status(500).json({ message: "Failed to add room." });
    }
});

// ============================================================
// GET /admin/rooms/updateroomdetails/:roomNumber - Get single room
// ============================================================
// Used by: Edit room modal (to fetch current room data)
// Response: Single room object
// ============================================================
router.get("/rooms/updateroomdetails/:roomNumber", async (req, res) => {
    try {
        const [rooms] = await pool.query(
            "SELECT * FROM rooms WHERE room_number = ?",
            [req.params.roomNumber],
        );

        if (rooms.length === 0) {
            return res.status(404).json({ message: "Room not found." });
        }

        res.json(formatRoomForAdmin(rooms[0]));
    } catch (error) {
        console.error("Error fetching room details:", error);
        res.status(500).json({ message: "Failed to fetch room details." });
    }
});

// ============================================================
// PATCH /admin/rooms/updateroomdetails/:roomNumber - Update a room
// ============================================================
// Request body: { roomName, roomType, price, isAvailable, ... }
//               (only send the fields you want to change)
// Response:     { message }
// ============================================================
router.patch("/rooms/updateroomdetails/:roomNumber", async (req, res) => {
    try {
        const {
            roomName,
            roomType,
            description,
            price,
            isAvailable,
            status,
            occupancy,
            amenities,
        } = req.body;

        // Determine availability from isAvailable or status
        let available = isAvailable;
        if (status !== undefined) {
            available = status === "available";
        }

        // Convert amenities object to JSON string if provided
        const amenitiesJson = amenities ? JSON.stringify(amenities) : undefined;
        const maxOccupancy = occupancy?.maxOccupancy;

        // Build UPDATE query dynamically (only update fields that were sent)
        const updates = [];
        const params = [];

        if (roomName !== undefined) {
            updates.push("room_name = ?");
            params.push(roomName);
        }
        if (roomType !== undefined) {
            updates.push("room_type = ?");
            params.push(roomType);
        }
        if (description !== undefined) {
            updates.push("description = ?");
            params.push(description);
        }
        if (price !== undefined) {
            updates.push("price = ?");
            params.push(price);
        }
        if (available !== undefined) {
            updates.push("is_available = ?");
            params.push(available);
        }
        if (maxOccupancy !== undefined) {
            updates.push("max_occupancy = ?");
            params.push(maxOccupancy);
        }
        if (amenitiesJson !== undefined) {
            updates.push("amenities = ?");
            params.push(amenitiesJson);
        }

        // If nothing to update, return error
        if (updates.length === 0) {
            return res.status(400).json({ message: "No fields to update." });
        }

        // Add room number to params (for the WHERE clause)
        params.push(req.params.roomNumber);

        await pool.query(
            `UPDATE rooms SET ${updates.join(", ")} WHERE room_number = ?`,
            params,
        );

        res.json({ message: "Room updated successfully." });
    } catch (error) {
        console.error("Error updating room:", error);
        res.status(500).json({ message: "Failed to update room." });
    }
});

// ============================================================
// DELETE /admin/rooms/deleteroom/:roomNumber - Delete a room
// ============================================================
// Response: { message }
// ============================================================
router.delete("/rooms/deleteroom/:roomNumber", async (req, res) => {
    try {
        const [result] = await pool.query(
            "DELETE FROM rooms WHERE room_number = ?",
            [req.params.roomNumber],
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Room not found." });
        }

        res.json({ message: "Room deleted successfully." });
    } catch (error) {
        console.error("Error deleting room:", error);
        res.status(500).json({ message: "Failed to delete room." });
    }
});

// ================================================================
//                      BOOKING ROUTES
// ================================================================

// ============================================================
// GET /admin/bookings/getbookinghistory - Get all bookings
// ============================================================
// Optional query: ?status=pending (filter by status)
// Response: Array of booking objects with nested customer & room info
// ============================================================
router.get("/bookings/getbookinghistory", async (req, res) => {
    try {
        const { status } = req.query;

        // JOIN with rooms and users tables to get names
        let query = `
      SELECT
        b.*,
        r.room_name, r.room_type, r.room_number,
        u.full_name as user_name
      FROM bookings b
      LEFT JOIN rooms r ON b.room_id = r.id
      LEFT JOIN users u ON b.user_id = u.id
    `;
        const params = [];

        // Add status filter if provided
        if (status && status !== "all") {
            query += " WHERE b.status = ?";
            params.push(status);
        }

        query += " ORDER BY b.created_at DESC";

        const [bookings] = await pool.query(query, params);

        // Format for admin frontend
        // The frontend expects nested objects: booking.customer.name, booking.room.id
        const formatted = bookings.map((b) => ({
            id: String(b.id),
            customer: {
                name: b.customer_name || b.user_name || "N/A",
            },
            customerName: b.customer_name || b.user_name || "N/A",
            room: {
                id: String(b.room_number || ""),
                name: b.room_name || "N/A",
            },
            checkIn: b.check_in,
            checkOut: b.check_out,
            guests: b.guests,
            totalAmount: b.total_amount,
            paymentMethod: b.payment_method,
            // Derive payment status from booking status
            paymentStatus:
                b.status === "completed"
                    ? "paid"
                    : b.status === "cancelled"
                      ? "refunded"
                      : "pending",
            status: b.status,
            createdAt: b.created_at,
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings." });
    }
});

// ============================================================
// PATCH /admin/bookings/updatebooking/:id - Update a booking
// ============================================================
// Request body: { status, checkIn, checkOut, guests }
//               (only send the fields you want to change)
// Response:     { message }
// ============================================================
router.patch("/bookings/updatebooking/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { status, checkIn, checkOut, guests } = req.body;

        // Build dynamic UPDATE query
        const updates = [];
        const params = [];

        if (status !== undefined) {
            updates.push("status = ?");
            params.push(status);
        }
        if (checkIn !== undefined) {
            updates.push("check_in = ?");
            params.push(checkIn);
        }
        if (checkOut !== undefined) {
            updates.push("check_out = ?");
            params.push(checkOut);
        }
        if (guests !== undefined) {
            updates.push("guests = ?");
            params.push(guests);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No fields to update." });
        }

        params.push(bookingId);
        const [result] = await pool.query(
            `UPDATE bookings SET ${updates.join(", ")} WHERE id = ?`,
            params,
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found." });
        }

        // If booking is completed or cancelled, make the room available again
        if (status === "completed" || status === "cancelled") {
            // Get the room_id from the booking first, then update the room
            const [booking] = await pool.query(
                "SELECT room_id FROM bookings WHERE id = ?",
                [bookingId],
            );
            if (booking.length > 0 && booking[0].room_id) {
                await pool.query(
                    "UPDATE rooms SET is_available = TRUE WHERE id = ?",
                    [booking[0].room_id],
                );
            }
        }

        res.json({ message: "Booking updated successfully." });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ message: "Failed to update booking." });
    }
});

// ============================================================
// DELETE /admin/bookings/deletebooking/:id - Delete a booking
// ============================================================
// Response: { message }
// ============================================================
router.delete("/bookings/deletebooking/:id", async (req, res) => {
    try {
        const bookingId = req.params.id;

        // First, get the room_id so we can make it available again
        const [booking] = await pool.query(
            "SELECT room_id FROM bookings WHERE id = ?",
            [bookingId],
        );

        // Make the room available again
        if (booking.length > 0 && booking[0].room_id) {
            await pool.query(
                "UPDATE rooms SET is_available = TRUE WHERE id = ?",
                [booking[0].room_id],
            );
        }

        // Delete the booking
        const [result] = await pool.query("DELETE FROM bookings WHERE id = ?", [
            bookingId,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found." });
        }

        res.json({ message: "Booking deleted successfully." });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ message: "Failed to delete booking." });
    }
});

// ================================================================
//                    CUSTOMER/USER ROUTES
// ================================================================

// ============================================================
// GET /admin/users/getallusers - Get all registered customers
// ============================================================
// Response: Array of user objects with booking stats
// ============================================================
router.get("/users/getallusers", async (req, res) => {
    try {
        // Get users with their booking count and total spent (using LEFT JOIN + GROUP BY)
        const [users] = await pool.query(`
      SELECT
        u.id, u.full_name, u.email, u.phone, u.created_at,
        COUNT(b.id) as total_bookings,
        COALESCE(SUM(b.total_amount), 0) as total_spent
      FROM users u
      LEFT JOIN bookings b ON u.id = b.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

        // Format for admin frontend
        const formatted = users.map((u) => ({
            id: String(u.id),
            name: u.full_name,
            email: u.email,
            phone: u.phone || "N/A",
            joinDate: u.created_at,
            totalBookings: u.total_bookings,
            totalSpent: u.total_spent,
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users." });
    }
});

// ============================================================
// PATCH /admin/users/updateuser/:id - Update a customer
// ============================================================
// Request body: { name, email, phone }
// Response:     { message }
// ============================================================
router.patch("/users/updateuser/:id", async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const updates = [];
        const params = [];

        if (name !== undefined) {
            updates.push("full_name = ?");
            params.push(name);
        }
        if (email !== undefined) {
            updates.push("email = ?");
            params.push(email);
        }
        if (phone !== undefined) {
            updates.push("phone = ?");
            params.push(phone);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No fields to update." });
        }

        params.push(req.params.id);
        const [result] = await pool.query(
            `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
            params,
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "User updated successfully." });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user." });
    }
});

// ============================================================
// DELETE /admin/users/deleteuser/:id - Delete a customer
// ============================================================
// Response: { message }
// ============================================================
router.delete("/users/deleteuser/:id", async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [
            req.params.id,
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user." });
    }
});

// ================================================================
//                      STAFF ROUTES
// ================================================================

// ============================================================
// GET /admin/staff/getstaffdetails - Get all staff members
// ============================================================
// Optional query: ?position=Manager (filter by position)
// Response: Array of staff objects
// ============================================================
router.get("/staff/getstaffdetails", async (req, res) => {
    try {
        const { position } = req.query;

        let query = "SELECT * FROM staff";
        const params = [];

        // Filter by position if provided
        if (position && position !== "all") {
            query += " WHERE position = ?";
            params.push(position);
        }

        query += " ORDER BY staff_id";

        const [staffRows] = await pool.query(query, params);

        // Format for admin frontend
        const formatted = staffRows.map((s) => ({
            staffId: s.staff_id,
            staffname: s.staff_name,
            position: s.position,
            email: s.email || "",
            createdAt: s.created_at,
        }));

        res.json(formatted);
    } catch (error) {
        console.error("Error fetching staff:", error);
        res.status(500).json({ message: "Failed to fetch staff." });
    }
});

// ============================================================
// POST /admin/staff/addstaff - Add a new staff member
// ============================================================
// Request body: { staffname, staffId, position, email }
// Response:     { message, staff }
// ============================================================
router.post("/staff/addstaff", async (req, res) => {
    try {
        const { staffname, staffId, position, email } = req.body;

        // Validate required fields
        if (!staffname || !staffId) {
            return res.status(400).json({
                message: "Staff name and ID are required.",
            });
        }

        await pool.query(
            "INSERT INTO staff (staff_id, staff_name, position, email) VALUES (?, ?, ?, ?)",
            [staffId, staffname, position || "Staff", email || null],
        );

        res.status(201).json({
            message: "Staff member added successfully",
            staff: { staffId, staffname, position, email },
        });
    } catch (error) {
        console.error("Error adding staff:", error);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                message: "A staff member with this ID already exists.",
            });
        }
        res.status(500).json({ message: "Failed to add staff member." });
    }
});

// ============================================================
// PATCH /admin/staff/updatestaffdetails/:staffId - Update staff
// ============================================================
// Request body: { staffname, position, email }
// Response:     { message }
// ============================================================
router.patch("/staff/updatestaffdetails/:staffId", async (req, res) => {
    try {
        const { staffname, position, email } = req.body;

        const updates = [];
        const params = [];

        if (staffname !== undefined) {
            updates.push("staff_name = ?");
            params.push(staffname);
        }
        if (position !== undefined) {
            updates.push("position = ?");
            params.push(position);
        }
        if (email !== undefined) {
            updates.push("email = ?");
            params.push(email);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No fields to update." });
        }

        params.push(req.params.staffId);
        const [result] = await pool.query(
            `UPDATE staff SET ${updates.join(", ")} WHERE staff_id = ?`,
            params,
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Staff member not found." });
        }

        res.json({ message: "Staff member updated successfully." });
    } catch (error) {
        console.error("Error updating staff:", error);
        res.status(500).json({ message: "Failed to update staff member." });
    }
});

// ============================================================
// DELETE /admin/staff/deletestaff/:staffId - Delete a staff member
// ============================================================
// Response: { message }
// ============================================================
router.delete("/staff/deletestaff/:staffId", async (req, res) => {
    try {
        const [result] = await pool.query(
            "DELETE FROM staff WHERE staff_id = ?",
            [req.params.staffId],
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Staff member not found." });
        }

        res.json({ message: "Staff member deleted successfully." });
    } catch (error) {
        console.error("Error deleting staff:", error);
        res.status(500).json({ message: "Failed to delete staff member." });
    }
});

module.exports = router;
