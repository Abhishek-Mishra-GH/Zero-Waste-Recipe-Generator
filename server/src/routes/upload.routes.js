// src/routes/upload.routes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../../uploads');

// Ensure the upload directory exists
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + "zerobite" + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route for uploading a file
router.post('/', upload.single('file'), (req, res) => {
    console.log('==> Upload endpoint hit');
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    
    // generate unique image url for the uploaded file
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ fileUrl });
});

module.exports = router;
