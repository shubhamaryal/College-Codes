# Hotel Management System - Setup Guide

## Project Structure
```
Project/
├── backend/          ← Express + MySQL API server (port 8000)
├── hm-system/        ← Customer frontend (port 5173)
└── hm-admin/         ← Admin frontend (port 5174)
```

## Step-by-Step Setup

### Step 1: Install MySQL (skip if already installed)
- **macOS**: `brew install mysql` then `brew services start mysql`
- **Or**: Download from https://dev.mysql.com/downloads/mysql/
- After installation, MySQL runs on `localhost:3306`

### Step 2: Create the Database
Open your MySQL client (MySQL Workbench, terminal, or TablePlus) and run the schema file:

**Option A - MySQL Workbench:**
1. Open MySQL Workbench → Connect to your local instance
2. File → Open SQL Script → Select `backend/database/schema.sql`
3. Click the ⚡ (Execute) button

**Option B - Terminal:**
```bash
mysql -u root -p < backend/database/schema.sql
```
(Enter your MySQL root password when prompted. If you haven't set a password, just press Enter.)

### Step 3: Update Database Password
Open `backend/.env` and set your MySQL password:
```
DB_PASSWORD=your_mysql_password_here
```
(If your MySQL root has no password, leave it empty.)

### Step 4: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 5: Seed Sample Data
This inserts sample admins, users, rooms, staff, and bookings:
```bash
cd backend
npm run seed
```
You should see:
```
✓ Admins seeded (admin123/admin123, manager/manager123)
✓ Users seeded (rahul@example.com/password123)
✓ Rooms seeded (7 rooms)
✓ Staff seeded (4 members)
✓ Bookings seeded (3 sample bookings)
```

### Step 6: Start the Backend
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:8000

### Step 7: Start Customer Frontend
Open a NEW terminal:
```bash
cd hm-system
npm install    # (first time only)
npm run dev
```
Customer site runs on: http://localhost:5173

### Step 8: Start Admin Frontend
Open ANOTHER terminal:
```bash
cd hm-admin
npm install    # (first time only)
npm run dev -- --port 5174
```
Admin panel runs on: http://localhost:5174

---

## Login Credentials

### Admin Panel (http://localhost:5174)
| Username  | Password    |
|-----------|-------------|
| admin123  | admin123    |
| manager   | manager123  |

### Customer Site (http://localhost:5173)
| Email               | Password    |
|---------------------|-------------|
| rahul@example.com   | password123 |
| priya@example.com   | password123 |

---

## How It All Works Together

```
Customer Browser (5173)  ──→  Backend API (8000)  ←──  Admin Browser (5174)
                                    ↕
                             MySQL Database
                          (hotel_management)
```

1. **Admin adds a room** → POST to backend → Saved in MySQL `rooms` table
2. **Customer browses rooms** → GET from backend → Reads from MySQL `rooms` table
3. **Customer books a room** → POST to backend → Saved in MySQL `bookings` table
4. **Admin views bookings** → GET from backend → Reads from MySQL `bookings` table

---

## Database Tables

| Table      | Purpose                          |
|------------|----------------------------------|
| `users`    | Customer accounts                |
| `admins`   | Admin/manager accounts           |
| `rooms`    | Hotel room inventory             |
| `bookings` | Room reservations                |
| `staff`    | Hotel staff directory            |

---

## API Endpoints Summary

### Customer Routes (`/user/*`)
| Method | Endpoint               | Auth        | Purpose                |
|--------|------------------------|-------------|------------------------|
| POST   | /user/signup           | No          | Register new customer  |
| POST   | /user/login            | No          | Customer login         |
| GET    | /user/booking/rooms    | No          | Get available rooms    |
| POST   | /user/booking/create   | userId body | Book a room            |
| GET    | /user/bookinghistory   | ?userId=    | View booking history   |
| GET    | /user/bookings/:id     | ?userId=    | View booking details   |
| PATCH  | /user/updatepassword   | userId body | Change password        |

**Note:** "Auth" is simple — the frontend stores `userId` in localStorage at login,
then sends it as a query param (`?userId=1`) for GET requests or in the request body for POST/PATCH.
No tokens or cookies needed.

### Admin Routes (`/admin/*`)
| Method | Endpoint                                  | Purpose               |
|--------|-------------------------------------------|-----------------------|
| POST   | /admin/login                              | Admin login           |
| GET    | /admin/rooms/getroomdetails               | Get all rooms         |
| GET    | /admin/rooms/filterroom                   | Filter rooms          |
| POST   | /admin/rooms/addroom                      | Add new room          |
| PATCH  | /admin/rooms/updateroomdetails/:roomNumber| Update room           |
| DELETE | /admin/rooms/deleteroom/:roomNumber       | Delete room           |
| GET    | /admin/bookings/getbookinghistory         | Get all bookings      |
| PATCH  | /admin/bookings/updatebooking/:id         | Update booking status |
| DELETE | /admin/bookings/deletebooking/:id         | Delete booking        |
| GET    | /admin/users/getallusers                  | Get all customers     |
| PATCH  | /admin/users/updateuser/:id               | Update customer       |
| DELETE | /admin/users/deleteuser/:id               | Delete customer       |
| GET    | /admin/staff/getstaffdetails              | Get all staff         |
| POST   | /admin/staff/addstaff                     | Add staff member      |
| PATCH  | /admin/staff/updatestaffdetails/:staffId  | Update staff          |
| DELETE | /admin/staff/deletestaff/:staffId         | Delete staff          |
