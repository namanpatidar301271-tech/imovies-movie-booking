const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const Cinema = require('../models/Cinema');
const { getDBStatus } = require('../config/db');
const { moviesStore, cinemasStore } = require('../config/store');

// @desc    Get all movies with optional filters
// @route   GET /api/movies
router.get('/', async (req, res) => {
  try {
    const { city, genre, search, vibe } = req.query;

    if (getDBStatus()) {
      let query = {};
      if (city && city !== 'All') {
        query.cities = { $in: [city] };
      }
      if (genre && genre !== 'All') {
        query.genre = { $in: [genre] };
      }
      if (vibe && vibe !== 'All') {
        query.districtVibe = vibe;
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { synopsis: { $regex: search, $options: 'i' } },
          { director: { $regex: search, $options: 'i' } }
        ];
      }

      let movies = await Movie.find(query);
      if (movies.length === 0 && !search && (!genre || genre === 'All')) {
        // Fallback to in-memory if db is empty
        movies = moviesStore;
      }
      return res.json({ success: true, count: movies.length, data: movies });
    } else {
      let filtered = [...moviesStore];

      if (city && city !== 'All') {
        filtered = filtered.filter((m) => m.cities && m.cities.includes(city));
      }
      if (genre && genre !== 'All') {
        filtered = filtered.filter((m) => m.genre && m.genre.includes(genre));
      }
      if (vibe && vibe !== 'All') {
        filtered = filtered.filter((m) => m.districtVibe === vibe);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.title.toLowerCase().includes(s) ||
            m.synopsis.toLowerCase().includes(s) ||
            m.director.toLowerCase().includes(s)
        );
      }

      return res.json({ success: true, count: filtered.length, data: filtered });
    }
  } catch (error) {
    console.error('Fetch movies error:', error);
    res.status(500).json({ success: false, message: 'Server error retrieving movies' });
  }
});

// @desc    Get trending/featured movies
// @route   GET /api/movies/featured
router.get('/featured', async (req, res) => {
  try {
    if (getDBStatus()) {
      const featured = await Movie.find({ isFeatured: true }).limit(5);
      return res.json({ success: true, data: featured.length ? featured : moviesStore.slice(0, 3) });
    } else {
      const featured = moviesStore.filter((m) => m.isFeatured);
      return res.json({ success: true, data: featured });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single movie by ID or slug
// @route   GET /api/movies/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      let movie;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        movie = await Movie.findById(id);
      } else {
        movie = await Movie.findOne({ $or: [{ slug: id }, { _id: id }] });
      }

      if (!movie) {
        movie = moviesStore.find((m) => m._id === id || m.slug === id);
      }

      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }

      return res.json({ success: true, data: movie });
    } else {
      const movie = moviesStore.find((m) => m._id === id || m.slug === id);
      if (!movie) {
        return res.status(404).json({ success: false, message: 'Movie not found' });
      }
      return res.json({ success: true, data: movie });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get cinemas & showtimes for a specific movie
// @route   GET /api/movies/:id/cinemas
router.get('/:id/cinemas', async (req, res) => {
  try {
    const { id } = req.params;
    const { city = 'Bengaluru', date } = req.query;

    let cinemas;
    if (getDBStatus()) {
      cinemas = await Cinema.find({ city: new RegExp(`^${city}$`, 'i') });
      if (cinemas.length === 0) {
        cinemas = cinemasStore.filter((c) => c.city.toLowerCase() === city.toLowerCase());
      }
    } else {
      cinemas = cinemasStore.filter((c) => c.city.toLowerCase() === city.toLowerCase());
    }

    // Filter shows for this movie
    const result = cinemas
      .map((c) => {
        const cinemaObj = c.toObject ? c.toObject() : JSON.parse(JSON.stringify(c));
        const matchedShows = cinemaObj.shows.filter((s) => s.movieId === id);
        return {
          ...cinemaObj,
          shows: matchedShows
        };
      })
      .filter((c) => c.shows.length > 0);

    return res.json({ success: true, count: result.length, data: result });
  } catch (error) {
    console.error('Fetch cinemas error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
