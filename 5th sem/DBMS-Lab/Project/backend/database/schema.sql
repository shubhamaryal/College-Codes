-- ============================================================
-- schema.sql - Database Schema for Hotel Management System
-- ============================================================
--
-- This file creates the database and all required tables.
-- You need to run this ONCE in your MySQL client before
-- starting the backend.
--
-- How to run:
--   Option 1 (MySQL Workbench): Open this file → Click Execute (⚡)
--   Option 2 (Terminal):        mysql -u root -p < database/schema.sql
--   Option 3 (MySQL CLI):       source /full/path/to/schema.sql
--
-- ============================================================

-- Create the database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS hotel_management;

-- Switch to our database
USE hotel_management;

-- ============================================================
-- TABLE: users
-- Purpose: Stores customer accounts (people who book rooms)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,          -- Unique user ID (auto-generated)
  full_name   VARCHAR(100)  NOT NULL,                  -- Customer's full name
  email       VARCHAR(100)  NOT NULL UNIQUE,           -- Email (must be unique - used for login)
  phone       VARCHAR(15),                             -- Phone number (optional)
  password    VARCHAR(255)  NOT NULL,                  -- Password (plain text for college project)
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP  -- When the account was created
);

-- ============================================================
-- TABLE: admins
-- Purpose: Stores admin/manager accounts for the admin panel
-- ============================================================
CREATE TABLE IF NOT EXISTS admins (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  username    VARCHAR(50)   NOT NULL UNIQUE,           -- Admin's login username
  password    VARCHAR(255)  NOT NULL,                  -- Password (plain text)
  name        VARCHAR(100)  NOT NULL,                  -- Display name
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: rooms
-- Purpose: Stores all hotel rooms that can be booked
-- ============================================================
CREATE TABLE IF NOT EXISTS rooms (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  room_number   INT           NOT NULL UNIQUE,             -- Room number (e.g., 101, 201, 301)
  room_name     VARCHAR(100)  NOT NULL,                    -- Display name (e.g., "Classic Single")
  room_type     ENUM('Classic', 'Deluxe', 'Suite') NOT NULL, -- Category of the room
  price         DECIMAL(10,2) NOT NULL,                    -- Price per night in Rs.
  is_available  BOOLEAN       DEFAULT TRUE,                -- TRUE = can be booked, FALSE = occupied
  amenities     TEXT,                                      -- Amenities stored as JSON string
  created_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- TABLE: bookings
-- Purpose: Stores all room reservations/bookings
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT,                                         -- Which customer made the booking (FK → users)
  room_id         INT,                                         -- Which room is booked (FK → rooms)
  check_in        DATE          NOT NULL,                      -- Check-in date
  check_out       DATE          NOT NULL,                      -- Check-out date
  guests          INT           DEFAULT 1,                     -- Number of guests
  customer_name   VARCHAR(100)  NOT NULL,                      -- Name from booking form
  customer_email  VARCHAR(100),                                -- Email from booking form
  customer_phone  VARCHAR(15),                                 -- Phone from booking form
  total_amount    DECIMAL(10,2) NOT NULL,                      -- Total booking amount in Rs.
  payment_method  ENUM('credit_card', 'paypal', 'cash') DEFAULT 'cash',
  status          ENUM('pending', 'approved', 'checked_in', 'completed', 'cancelled') DEFAULT 'pending',
  created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,

  -- Foreign Keys: Link bookings to users and rooms
  -- ON DELETE SET NULL: If a user/room is deleted, the booking stays but the reference becomes NULL
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE SET NULL
);

-- ============================================================
-- TABLE: staff
-- Purpose: Stores hotel staff members (managed by admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS staff (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  staff_id    VARCHAR(20)   NOT NULL UNIQUE,           -- Custom staff ID (e.g., "STF001")
  staff_name  VARCHAR(100)  NOT NULL,                  -- Staff member's name
  position    VARCHAR(50)   NOT NULL,                  -- Job title (Manager, Receptionist, etc.)
  email       VARCHAR(100),                            -- Staff email
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
