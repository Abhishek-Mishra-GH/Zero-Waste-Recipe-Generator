const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
// const donationRoutes = require('./donation.routes');
const uploadRoutes = require('./upload.routes');
const recipeRoutes = require('./recipe.routes');
const donationRoutes = require('./donation.routes');

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/recipe', recipeRoutes);
router.use('/donation', donationRoutes);

module.exports = router;