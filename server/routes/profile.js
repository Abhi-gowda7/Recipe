// routes/profile.js
const express = require('express');
const { protect } = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

// Get User Profile
router.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

// Update User Profile
router.put('/', protect, async (req, res) => {
  const { username, bio, profilePicture } = req.body;
  const user = await User.findById(req.user._id);
  user.username = username || user.username;
  user.bio = bio || user.bio;
  user.profilePicture = profilePicture || user.profilePicture;
  await user.save();
  res.json(user);
});

module.exports = router;
