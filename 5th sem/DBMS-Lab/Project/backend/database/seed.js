// ============================================================
// database/seed.js - Seed Initial Data into the Database
// ============================================================
//
// This script inserts sample data so you can test the app
// without manually adding everything from the admin panel.
//
// How to run (from the backend folder):
//   npm run seed
//   (or: node database/seed.js)
//
// ============================================================

const pool = require("../config/db");

async function seed() {
    try {
        console.log("🌱 Seeding database...\n");

        // ---- 1. Seed Admin Accounts ----
        // Passwords are stored as plain text (this is a college project, not production)
        await pool.query(`
      INSERT IGNORE INTO admins (username, password, name) VALUES
      ('admin123', 'admin123', 'John Admin'),
      ('manager', 'manager123', 'Sarah Manager')
    `);
        console.log("✓ Admins seeded (admin123/admin123, manager/manager123)");

        // ---- 2. Seed Sample Customers ----
        await pool.query(`
      INSERT IGNORE INTO users (full_name, email, phone, password) VALUES
      ('Rahul Sharma', 'rahul@example.com', '9876543210', 'password123'),
      ('Priya Patel', 'priya@example.com', '9876543211', 'password123')
    `);
        console.log(
            "✓ Users seeded (rahul@example.com/password123, priya@example.com/password123)",
        );

        // ---- 3. Seed Hotel Rooms ----
        // amenities is stored as a JSON string
        await pool.query(`
      INSERT IGNORE INTO rooms (room_number, room_name, room_type, description, price, is_available, max_occupancy, amenities, image_url) VALUES
      (101, 'Classic Single',   'Classic', 'A cozy single room perfect for solo travelers. Features modern decor with all essential amenities.',                1200.00,  TRUE, 1, '{"wifi":true,"bathrooms":1,"beds":{"king":0,"queen":0,"single":1}}', '/room-type/classic.png'),
      (102, 'Classic Queen',    'Classic', 'Comfortable room with a queen-size bed, ideal for couples or business travelers.',                                1800.00, TRUE, 2, '{"wifi":true,"bathrooms":1,"beds":{"king":0,"queen":1,"single":0}}', '/room-type/classic.png'),
      (103, 'Classic Twin',     'Classic', 'Spacious room with two single beds, perfect for friends traveling together.',                                     1500.00, TRUE, 2, '{"wifi":true,"bathrooms":1,"beds":{"king":0,"queen":0,"single":2}}', '/room-type/classic.png'),
      (201, 'Deluxe King',      'Deluxe',  'Spacious deluxe room with a king-size bed and stunning city view. Premium amenities included.',                  2800.00, TRUE, 2, '{"wifi":true,"bathrooms":1,"beds":{"king":1,"queen":0,"single":0}}', '/room-type/deluxe.png'),
      (202, 'Deluxe Twin',      'Deluxe',  'Modern deluxe room with two comfortable beds and contemporary furnishings.',                                     2500.00, TRUE, 2, '{"wifi":true,"bathrooms":1,"beds":{"king":0,"queen":0,"single":2}}', '/room-type/deluxe.png'),
      (301, 'Family Suite',     'Suite',   'Perfect for families - features a king bed and twin beds with a separate living area.',                           4200.00, TRUE, 4, '{"wifi":true,"bathrooms":2,"beds":{"king":1,"queen":0,"single":2}}', '/room-type/suite.png'),
      (302, 'Executive Suite',  'Suite',   'Premium suite with king bed, jacuzzi, living area, and panoramic city view.',                                     5000.00, TRUE, 2, '{"wifi":true,"bathrooms":2,"beds":{"king":1,"queen":0,"single":0}}', '/room-type/suite.png')
    `);
        console.log("✓ Rooms seeded (7 rooms: 3 Classic, 2 Deluxe, 2 Suite)");

        // ---- 4. Seed Hotel Staff ----
        await pool.query(`
      INSERT IGNORE INTO staff (staff_id, staff_name, position, email) VALUES
      ('STF001', 'Amit Kumar',   'Manager',      'amit@hotel.com'),
      ('STF002', 'Sneha Reddy',  'Receptionist', 'sneha@hotel.com'),
      ('STF003', 'Ravi Singh',   'Housekeeping', 'ravi@hotel.com'),
      ('STF004', 'Meena Gupta',  'Chef',         'meena@hotel.com')
    `);
        console.log("✓ Staff seeded (4 members)");

        // ---- 5. Seed Sample Bookings ----
        await pool.query(`
      INSERT IGNORE INTO bookings (user_id, room_id, check_in, check_out, guests, customer_name, customer_email, customer_phone, total_amount, payment_method, status) VALUES
      (1, 1, '2026-03-01', '2026-03-03', 1, 'Rahul Sharma',  'rahul@example.com', '9876543210', 2400.00, 'credit_card', 'approved'),
      (2, 4, '2026-03-05', '2026-03-07', 2, 'Priya Patel',   'priya@example.com', '9876543211', 5600.00, 'cash',        'pending'),
      (1, 6, '2026-03-10', '2026-03-15', 3, 'Rahul Sharma',  'rahul@example.com', '9876543210', 21000.00,'credit_card', 'completed')
    `);
        console.log("✓ Bookings seeded (3 sample bookings)");

        console.log("\n✅ Database seeded successfully!");
        console.log("\n📋 Login Credentials:");
        console.log(
            "   Admin:    admin123 / admin123  (or manager / manager123)",
        );
        console.log("   Customer: rahul@example.com / password123");
        console.log("             priya@example.com / password123\n");

        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error seeding database:", error.message);
        console.error(
            "   Make sure you have run schema.sql first and MySQL is running.\n",
        );
        process.exit(1);
    }
}

seed();
