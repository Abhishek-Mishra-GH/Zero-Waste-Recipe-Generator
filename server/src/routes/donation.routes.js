const express = require('express');
const router = express.Router();
const prisma = require('../../prisma/client');
const authenticateToken = require('../middlewares/auth.middleware');


router.post('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const donation = req.body;

  try {
    await prisma.donation.create({
      data: {
        userId,
        ...donation,
      },
    });
    res.status(201).json({ message: 'Donation saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save donation' });
  }
});

module.exports = router;