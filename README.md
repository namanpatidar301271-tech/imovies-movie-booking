# 🎬 IMovies — District Edition | Movie Ticket Booking Made Simple

<div align="center">

![IMovies Banner](https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80)

**An ultra-modern, high-performance cinema ticketing platform inspired by District's immersive entertainment experience.**

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-ff2a6d?style=for-the-badge&logo=github)](https://github.com/namanpatidar301271-tech/imovies-movie-booking)
[![License: MIT](https://img.shields.io/badge/License-MIT-00f2fe?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.19-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%26%20Mongoose-brightgreen?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

### 👨‍💻 Student & Project Credentials
| Parameter | Value |
|---|---|
| **Developer Name** | Naman Patidar |
| **GitHub Username** | [`namanpatidar301271-tech`](https://github.com/namanpatidar301271-tech) |
| **GitHub Email** | `namanpatidar301271@gmail.com` |
| **Repository Name** | [`imovies-movie-booking`](https://github.com/namanpatidar301271-tech/imovies-movie-booking) |
| **Project Track** | Full-Stack Web Development (MERN) • Entertainment |
| **Design Paradigm** | **District App UI/UX** (Zomato District-inspired Obsidian/Neon Aesthetic) |

</div>

---

## 🌟 What Makes This Version Distinct (District Experience)

Unlike standard movie portals, this edition is crafted specifically around the sleek, high-energy **District App** visual identity and workflow:

1. **📍 Dynamic City Switcher**: Seamless switching across metropolitan regions (Bengaluru, Mumbai, Delhi-NCR, Pune, Hyderabad) with localized theatre screens and showtime catalogs.
2. **🔥 District Vibe Curations**: Filter screenings by energy tags: *District Hype 🔥*, *Blockbuster Surge ⚡*, *Cult Masterpiece 🌌*, and *Midnight Fever 🌙*.
3. **🎭 Multiplex Venue Hierarchy**: Venues showcase brand badges (PVR INOX, Cinepolis VIP, IMAX Laser), real-time distance calculation, gourmet dining amenities, and occupancy-colored show pills (`Available`, `Fast Filling`, `Almost Full`).
4. **🎟️ Interactive 3-Tier Visual Seat Map**:
   - Curved neon glowing screen indicator with *"SCREEN THIS WAY"* ambient lighting.
   - **👑 VIP Recliner Club** (Rows A & B)
   - **🌟 Prime Gold** (Rows C & D)
   - **🎟️ Standard Silver** (Rows E & F)
   - Real-time seat locking, multi-seat selection (up to 8 seats), and instant pricing tally.
5. **🍿 "Grab a Bite" F&B Add-on Drawer**: Add Caramel Popcorn, Cheesy Nachos, and Pepsi Combos delivered straight to your cinema seat.
6. **⚡ District Digital FastPass (Boarding Pass E-Ticket)**:
   - Unique alphanumeric booking code (e.g., `DST-842918`).
   - Integrated QR Code verification pass.
   - Print / Save E-Ticket button and instant one-click cancellation with 100% simulated refund.
7. **🛡️ Dual-Mode Persistence Architecture**:
   - Primary: **MongoDB / Mongoose** for cloud or local NoSQL persistence.
   - Fail-Safe: Embedded **In-Memory Zero-Config Engine** that activates automatically if MongoDB is offline, guaranteeing mentors can run and evaluate the app with zero setup friction!

---

## 🏗️ Technical Architecture & Tech Stack

```
imovies-movie-booking/
├── client/                     # District React 18 SPA (Vite + Bootstrap 5)
│   ├── src/
│   │   ├── api.js              # Centralized Axios/Fetch API client with JWT injection
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global user auth & city preference state
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky glassmorphism nav with city switcher
│   │   │   ├── Footer.jsx      # Footer with mentor verification badges
│   │   │   └── MovieCard.jsx   # District card with rating, tags, and poster
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Spotlight hero banner & multi-filter grid
│   │   │   ├── MovieDetails.jsx# Showtimes grouped by cinema venue & date tabs
│   │   │   ├── SeatSelection.jsx# 3-tier curved interactive seat layout
│   │   │   ├── Checkout.jsx    # F&B snacks drawer + UPI/Card payment simulation
│   │   │   ├── MyBookings.jsx  # Digital boarding pass tickets + QR scanner
│   │   │   ├── Login.jsx       # Auth login with 1-click Demo Quick Fill
│   │   │   └── Register.jsx    # User registration with city preference
│   │   └── index.css           # District obsidian dark mode design system
│   └── package.json
│
├── server/                     # Node.js + Express REST API Backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection with graceful fallback
│   │   └── store.js            # In-memory persistence engine
│   ├── models/
│   │   ├── User.js             # Mongoose User schema with bcrypt hashing
│   │   ├── Movie.js            # Movie schema with vibes, cast & formats
│   │   ├── Cinema.js           # Multi-theatre shows & seat layout schema
│   │   └── Booking.js          # Booking ticket & transaction record schema
│   ├── routes/
│   │   ├── authRoutes.js       # Register, Login, Me endpoints
│   │   ├── movieRoutes.js      # Filtered movie catalog & details
│   │   ├── cinemaRoutes.js     # Venue listings & showtime details
│   │   └── bookingRoutes.js    # Seat reservation, verification & cancellation
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification middleware
│   ├── seed/
│   │   └── seedData.js         # Pre-configured blockbuster dataset
│   ├── server.js               # Express application entry point
│   ├── test-api.js             # Automated integration verification suite
│   └── package.json
│
└── package.json                # Root concurrently development runner
```

---

## 🚀 Quick Start Guide (How to Run Locally)

### Step 1: Clone the Repository
```bash
git clone https://github.com/namanpatidar301271-tech/imovies-movie-booking.git
cd imovies-movie-booking
```

### Step 2: Install All Dependencies
You can install dependencies for root, server, and client in one command:
```bash
npm run install:all
```
*(Or navigate into `server` and `client` individually and run `npm install`)*

### Step 3: Configure Environment Variables
Inside `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/imovies_district
JWT_SECRET=imovies_district_super_secret_jwt_key_2026
NODE_ENV=development
```
> **Note:** If local MongoDB is not running, the application will automatically activate its built-in persistence engine without any crash or configuration required!

### Step 4: Run the Application
From the root directory, start both frontend and backend concurrently:
```bash
npm run dev
```

Alternatively, run in separate terminals:
- **Terminal 1 (Backend Server):**
  ```bash
  cd server
  npm start
  # Running at: http://localhost:5000
  ```
- **Terminal 2 (Frontend Client):**
  ```bash
  cd client
  npm run dev
  # Running at: http://localhost:3000
  ```

---

## 🧪 Verified Demo Credentials for Mentors

You can test the entire workflow immediately without creating an account:

| Role | Email | Password |
|---|---|---|
| **Demo User** | `demo@imovies.com` | `Demo@123` |
| **Admin User** | `namanpatidar301271@gmail.com` | `Password@123` |

*(On the Login page, click the **"Auto Fill"** button in the Mentor Quick Demo box to populate credentials instantly!)*

---

## 📡 REST API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Register new user account | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & return JWT token | ❌ |
| `GET` | `/api/auth/me` | Fetch logged-in user profile | ✅ |
| `GET` | `/api/movies` | Get movie catalog with city, genre & vibe filters | ❌ |
| `GET` | `/api/movies/:id` | Get movie details, cast, and synopsis | ❌ |
| `GET` | `/api/movies/:id/cinemas` | Get cinema venues & showtimes for a movie | ❌ |
| `GET` | `/api/cinemas/shows/:showId` | Get show seating status & tier pricing | ❌ |
| `GET` | `/api/addons` | Get food & concession add-ons | ❌ |
| `POST` | `/api/bookings` | Reserve seats & create digital ticket pass | ✅ |
| `GET` | `/api/bookings/my` | Retrieve logged-in user's bookings | ✅ |
| `POST` | `/api/bookings/:id/cancel` | Cancel booking & release seats for refund | ✅ |
| `GET` | `/api/health` | Backend status and database mode check | ❌ |

---

## 📤 Step-by-Step GitHub Setup Instructions

To push this codebase to your GitHub repository (`namanpatidar301271-tech/imovies-movie-booking`):

```bash
# 1. Initialize git in the project root
cd C:\Users\sinha\.gemini\antigravity\scratch\imovies-movie-booking
git init

# 2. Configure Git user credentials
git config user.name "namanpatidar301271-tech"
git config user.email "namanpatidar301271@gmail.com"

# 3. Add all project files (excluding node_modules as per .gitignore)
git add .

# 4. Create the initial commit
git commit -m "feat: complete IMovies District-style movie ticketing platform (MERN)"

# 5. Set default branch to main
git branch -M main

# 6. Add the remote GitHub repository
git remote add origin https://github.com/namanpatidar301271-tech/imovies-movie-booking.git

# 7. Push to GitHub
git push -u origin main
```

---

<div align="center">
Built with ❤️ by <strong>Naman Patidar</strong> for <strong>IMovies Project Showcase</strong>.
</div>
