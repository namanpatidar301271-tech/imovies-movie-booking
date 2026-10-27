const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB, getDBStatus } = require('./config/db');
const { initialFoodAddons, initialMovies, initialCinemas } = require('./seed/seedData');
const Movie = require('./models/Movie');
const Cinema = require('./models/Cinema');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to DB (with non-blocking fallback)
connectDB().then(async (connected) => {
  if (connected) {
    try {
      const count = await Movie.countDocuments();
      if (count === 0) {
        console.log('[Seed] Database empty. Auto-seeding initial District movies & cinemas...');
        await Movie.insertMany(initialMovies);
        await Cinema.insertMany(initialCinemas);
        console.log('[Seed] Database seeded successfully!');
      }
    } catch (err) {
      console.warn('[Seed Error]', err.message);
    }
  }
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/cinemas', require('./routes/cinemaRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Food and Concessions Addons endpoint
app.get('/api/addons', (req, res) => {
  res.json({
    success: true,
    data: initialFoodAddons
  });
});

// System Status & Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'IMovies - District Experience',
    version: '1.0.0',
    mode: getDBStatus() ? 'MongoDB Cluster' : 'In-Memory High-Speed Store',
    timestamp: new Date().toISOString()
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.send('IMovies Cinema Booking Engine API is live.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Error Middleware]:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎬 IMovies (District Style) Server running on port ${PORT}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;

