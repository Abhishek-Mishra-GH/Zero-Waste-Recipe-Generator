const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
// const donationRoutes = require('./donation.routes');
const uploadRoutes = require('./upload.routes');
const recipeRoutes = require('./recipe.routes');

router.use('/auth', authRoutes);
router.use('/upload', uploadRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;