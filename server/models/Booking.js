const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    },
    userPhone: {
      type: String,
      default: ''
    },
    movieId: {
      type: String,
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    },
    moviePoster: {
      type: String
    },
    certificate: {
      type: String,
      default: 'UA 16+'
    },
    cinemaId: {
      type: String
    },
    cinemaName: {
      type: String,
      required: true
    },
    cinemaCity: {
      type: String,
      required: true
    },
    cinemaLocation: {
      type: String
    },
    screenName: {
      type: String,
      default: 'Screen 1'
    },
    showId: {
      type: String,
      required: true
    },
    showTime: {
      type: String,
      required: true
    },
    showDate: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: '2D'
    },
    language: {
      type: String,
      default: 'English'
    },
    seats: [
      {
        type: String,
        required: true
      }
    ],
    seatDetails: [
      {
        seatId: String,
        tier: String,
        price: Number
      }
    ],
    subtotal: {
      type: Number,
      required: true
    },
    convenienceFee: {
      type: Number,
      default: 48
    },
    foodAddons: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      default: 'District UPI'
    },
    paymentStatus: {
      type: String,
      enum: ['PAID', 'PENDING', 'FAILED', 'REFUNDED'],
      default: 'PAID'
    },
    status: {
      type: String,
      enum: ['CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED'
    },
    qrCodeString: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
