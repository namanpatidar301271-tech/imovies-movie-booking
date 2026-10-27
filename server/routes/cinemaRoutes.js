const express = require('express');
const router = express.Router();
const Cinema = require('../models/Cinema');
const { getDBStatus } = require('../config/db');
const { cinemasStore } = require('../config/store');

// @desc    Get cinemas in a city
// @route   GET /api/cinemas
router.get('/', async (req, res) => {
  try {
    const { city = 'Bengaluru' } = req.query;

    if (getDBStatus()) {
      let cinemas = await Cinema.find({ city: new RegExp(`^${city}$`, 'i') });
      if (cinemas.length === 0) {
        cinemas = cinemasStore.filter((c) => c.city.toLowerCase() === city.toLowerCase());
      }
      return res.json({ success: true, count: cinemas.length, data: cinemas });
    } else {
      const cinemas = cinemasStore.filter((c) => c.city.toLowerCase() === city.toLowerCase());
      return res.json({ success: true, count: cinemas.length, data: cinemas });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get detailed showtime and seat layout data
// @route   GET /api/cinemas/shows/:showId
router.get('/shows/:showId', async (req, res) => {
  try {
    const { showId } = req.params;

    let foundShow = null;
    let foundCinema = null;

    if (getDBStatus()) {
      const cinema = await Cinema.findOne({ 'shows.showId': showId });
      if (cinema) {
        foundCinema = cinema;
        foundShow = cinema.shows.find((s) => s.showId === showId);
      }
    }

    if (!foundShow) {
      for (const cinema of cinemasStore) {
        const s = cinema.shows.find((item) => item.showId === showId);
        if (s) {
          foundCinema = cinema;
          foundShow = s;
          break;
        }
      }
    }

    if (!foundShow || !foundCinema) {
      return res.status(404).json({ success: false, message: 'Showtime not found' });
    }

    return res.json({
      success: true,
      data: {
        cinema: {
          id: foundCinema._id,
          name: foundCinema.name,
          brand: foundCinema.brand,
          city: foundCinema.city,
          location: foundCinema.location
        },
        show: foundShow
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
