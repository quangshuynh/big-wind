// backend/routes/user.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


// Middleware to protect routes (require authentication)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Forbidden: Invalid token.' });
    }
    req.user = user; // Attach the user data to the request object
    next(); // Continue to the next middleware/route handler
  });
};


// Get user data (protected route)
router.get('/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }, // Exclude the password
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Parse the JSON strings before sending
    user.jars = JSON.parse(user.jars);
    user.upgrades = JSON.parse(user.upgrades)
    res.status(200).json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching user data.' });
  }
});

// Update user data (protected route)
router.put('/data', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user data (only allow updating specific fields)
    const { pffts, jars, upgrades } = req.body;

    if (pffts !== undefined) {
        user.pffts = pffts;
    }
    if (jars !== undefined) {
        user.jars = JSON.stringify(jars); // Store as JSON string
    }
    if(upgrades !== undefined){
      user.upgrades = JSON.stringify(upgrades);
    }

    await user.save();
    res.status(200).json({ message: 'User data updated successfully.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating user data.' });
  }
});

module.exports = router;