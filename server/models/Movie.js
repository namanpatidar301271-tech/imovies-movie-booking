const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true
    },
    tagline: {
      type: String,
      default: ''
    },
    genre: [
      {
        type: String
      }
    ],
    language: [
      {
        type: String
      }
    ],
    format: [
      {
        type: String
      }
    ],
    duration: {
      type: Number, // in minutes
      required: true
    },
    rating: {
      type: Number,
      default: 8.5
    },
    votesCount: {
      type: String,
      default: '45.2K'
    },
    releaseDate: {
      type: String,
      default: '2026-05-15'
    },
    certificate: {
      type: String,
      default: 'UA 16+'
    },
    poster: {
      type: String,
      required: true
    },
    backdrop: {
      type: String,
      required: true
    },
    synopsis: {
      type: String,
      required: true
    },
    cast: [
      {
        name: String,
        role: String,
        photo: String
      }
    ],
    director: {
      type: String,
      default: 'Christopher Nolan'
    },
    districtVibe: {
      type: String,
      default: 'District Hype 🔥'
    },
    isTrending: {
      type: Boolean,
      default: false
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    cities: [
      {
        type: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);
