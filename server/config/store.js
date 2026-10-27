const { initialMovies, initialCinemas } = require('../seed/seedData');
const bcrypt = require('bcryptjs');

// In-memory persistent state for zero-config fallback
let moviesStore = JSON.parse(JSON.stringify(initialMovies));
let cinemasStore = JSON.parse(JSON.stringify(initialCinemas));
let bookingsStore = [];
let usersStore = [
  {
    _id: 'usr-admin-1',
    name: 'Naman Patidar',
    email: 'namanpatidar301271@gmail.com',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    phone: '+91 98765 43210',
    city: 'Bengaluru',
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr-demo-2',
    name: 'Demo Moviegoer',
    email: 'demo@imovies.com',
    passwordHash: bcrypt.hashSync('Demo@123', 10),
    phone: '+91 91234 56789',
    city: 'Bengaluru',
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

module.exports = {
  moviesStore,
  cinemasStore,
  bookingsStore,
  usersStore
};
