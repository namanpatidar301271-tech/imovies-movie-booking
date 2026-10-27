const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  showId: {
    type: String,
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String
  },
  time: {
    type: String,
    required: true // e.g., '10:30 AM', '02:15 PM'
  },
  date: {
    type: String,
    required: true // e.g. 'Today, 28 Oct'
  },
  format: {
    type: String,
    default: '4K Dolby Atmos'
  },
  language: {
    type: String,
    default: 'English'
  },
  screenName: {
    type: String,
    default: 'Screen 1 (Laser Max)'
  },
  status: {
    type: String,
    enum: ['available', 'fast_filling', 'almost_full'],
    default: 'available'
  },
  pricing: {
    standard: { type: Number, default: 220 },
    prime: { type: Number, default: 350 },
    recliner: { type: Number, default: 550 }
  },
  bookedSeats: [
    {
      type: String
    }
  ]
});

const cinemaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      default: 'District Luxe'
    },
    city: {
      type: String,
      required: true,
      index: true
    },
    location: {
      type: String,
      required: true
    },
    distance: {
      type: String,
      default: '2.5 km away'
    },
    amenities: [
      {
        type: String
      }
    ],
    rating: {
      type: Number,
      default: 4.8
    },
    shows: [showSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Cinema', cinemaSchema);
