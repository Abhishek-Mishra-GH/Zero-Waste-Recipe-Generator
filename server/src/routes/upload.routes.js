// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');

router.post('/', upload.array('images', 3), (req, res) => {
  const urls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
  res.json({ urls });
});

module.exports = router;
