const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Cinema = require('../models/Cinema');
const { getDBStatus } = require('../config/db');
const { bookingsStore, cinemasStore } = require('../config/store');
const { protect } = require('../middleware/authMiddleware');

const generateBookingCode = () => {
  const prefix = 'DST';
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
};

// @desc    Create a new movie booking
// @route   POST /api/bookings
router.post('/', protect, async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      moviePoster,
      certificate,
      cinemaId,
      cinemaName,
      cinemaCity,
      cinemaLocation,
      screenName,
      showId,
      showTime,
      showDate,
      format,
      language,
      seats,
      seatDetails,
      subtotal,
      convenienceFee = 48,
      foodAddons = [],
      totalAmount,
      paymentMethod = 'District UPI'
    } = req.body;

    if (!showId || !seats || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking data. Please select at least one seat.'
      });
    }

    const bookingId = generateBookingCode();
    const qrCodeData = `https://imovies.district.app/verify/${bookingId}?show=${showId}&seats=${seats.join(',')}`;

    if (getDBStatus()) {
      // 1. Verify seat availability in DB
      const cinema = await Cinema.findOne({ 'shows.showId': showId });
      if (cinema) {
        const show = cinema.shows.find((s) => s.showId === showId);
        const alreadyBooked = seats.some((seat) => show.bookedSeats.includes(seat));
        if (alreadyBooked) {
          return res.status(409).json({
            success: false,
            message: 'One or more of the selected seats were just taken. Please choose another seat.'
          });
        }
        // Mark seats as booked
        show.bookedSeats.push(...seats);
        await cinema.save();
      }

      // 2. Create booking document
      const booking = await Booking.create({
        bookingId,
        user: req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
        userPhone: req.user.phone,
        movieId,
        movieTitle,
        moviePoster,
        certificate: certificate || 'UA 16+',
        cinemaId,
        cinemaName,
        cinemaCity,
        cinemaLocation,
        screenName: screenName || 'Screen 1',
        showId,
        showTime,
        showDate,
        format: format || '2D',
        language: language || 'English',
        seats,
        seatDetails: seatDetails || [],
        subtotal,
        convenienceFee,
        foodAddons,
        totalAmount,
        paymentMethod,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        qrCodeString: qrCodeData
      });

      return res.status(201).json({
        success: true,
        message: 'Booking confirmed successfully!',
        data: booking
      });
    } else {
      // In-memory store handling
      let foundShow = null;
      for (const cinema of cinemasStore) {
        const s = cinema.shows.find((item) => item.showId === showId);
        if (s) {
          foundShow = s;
          break;
        }
      }

      if (foundShow) {
        const alreadyBooked = seats.some((seat) => foundShow.bookedSeats.includes(seat));
        if (alreadyBooked) {
          return res.status(409).json({
            success: false,
            message: 'One or more of the selected seats were just booked. Please pick other seats.'
          });
        }
        foundShow.bookedSeats.push(...seats);
      }

      const newBooking = {
        _id: 'bkg-' + Date.now(),
        bookingId,
        user: req.user.id || req.user._id,
        userName: req.user.name,
        userEmail: req.user.email,
        userPhone: req.user.phone || '',
        movieId,
        movieTitle,
        moviePoster,
        certificate: certificate || 'UA 16+',
        cinemaId,
        cinemaName,
        cinemaCity,
        cinemaLocation,
        screenName: screenName || 'Screen 1',
        showId,
        showTime,
        showDate,
        format: format || '2D',
        language: language || 'English',
        seats,
        seatDetails: seatDetails || [],
        subtotal,
        convenienceFee,
        foodAddons,
        totalAmount,
        paymentMethod,
        paymentStatus: 'PAID',
        status: 'CONFIRMED',
        qrCodeString: qrCodeData,
        createdAt: new Date().toISOString()
      };

      bookingsStore.unshift(newBooking);

      return res.status(201).json({
        success: true,
        message: 'Booking confirmed successfully!',
        data: newBooking
      });
    }
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: 'Failed to process booking.' });
  }
});

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
router.get('/my', protect, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    if (getDBStatus()) {
      const bookings = await Booking.find({
        $or: [{ user: userId }, { userEmail: req.user.email }]
      }).sort({ createdAt: -1 });

      return res.json({ success: true, count: bookings.length, data: bookings });
    } else {
      const userBookings = bookingsStore.filter(
        (b) => b.user === userId || b.userEmail === req.user.email
      );
      return res.json({ success: true, count: userBookings.length, data: userBookings });
    }
  } catch (error) {
    console.error('Fetch user bookings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const booking = await Booking.findOne({
        $or: [{ _id: id }, { bookingId: id }]
      });
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: booking });
    } else {
      const booking = bookingsStore.find((b) => b._id === id || b.bookingId === id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      return res.json({ success: true, data: booking });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Cancel booking
// @route   POST /api/bookings/:id/cancel
router.post('/:id/cancel', protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (getDBStatus()) {
      const booking = await Booking.findOne({
        $or: [{ _id: id }, { bookingId: id }]
      });
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      booking.status = 'CANCELLED';
      booking.paymentStatus = 'REFUNDED';
      await booking.save();

      // Release seats in cinema
      const cinema = await Cinema.findOne({ 'shows.showId': booking.showId });
      if (cinema) {
        const show = cinema.shows.find((s) => s.showId === booking.showId);
        if (show) {
          show.bookedSeats = show.bookedSeats.filter((seat) => !booking.seats.includes(seat));
          await cinema.save();
        }
      }

      return res.json({ success: true, message: 'Booking cancelled and refund initiated.', data: booking });
    } else {
      const booking = bookingsStore.find((b) => b._id === id || b.bookingId === id);
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }

      booking.status = 'CANCELLED';
      booking.paymentStatus = 'REFUNDED';

      // Release seats
      for (const cinema of cinemasStore) {
        const show = cinema.shows.find((s) => s.showId === booking.showId);
        if (show) {
          show.bookedSeats = show.bookedSeats.filter((seat) => !booking.seats.includes(seat));
          break;
        }
      }

      return res.json({ success: true, message: 'Booking cancelled and refund initiated.', data: booking });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
