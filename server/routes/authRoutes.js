const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');
const { usersStore } = require('../config/store');
const { protect } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'imovies_district_super_secret_jwt_key_2026', {
    expiresIn: '7d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getDBStatus()) {
      const userExists = await User.findOne({ email: normalizedEmail });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already registered.' });
      }

      const user = await User.create({
        name,
        email: normalizedEmail,
        password,
        phone: phone || '',
        city: city || 'Bengaluru'
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          role: user.role
        }
      });
    } else {
      // In-memory fallback
      const userExists = usersStore.find((u) => u.email === normalizedEmail);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already registered.' });
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const newUser = {
        _id: 'usr-' + Date.now(),
        name,
        email: normalizedEmail,
        passwordHash,
        phone: phone || '',
        city: city || 'Bengaluru',
        role: 'user',
        createdAt: new Date().toISOString()
      };
      usersStore.push(newUser);

      const token = generateToken(newUser._id);

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          city: newUser.city,
          role: newUser.role
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (getDBStatus()) {
      const user = await User.findOne({ email: normalizedEmail }).select('+password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          role: user.role
        }
      });
    } else {
      // In-memory fallback
      const user = usersStore.find((u) => u.email === normalizedEmail);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const isMatch = bcrypt.compareSync(password, user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          role: user.role
        }
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// @desc    Get current user profile
// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;
