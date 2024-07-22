const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const Upload = require('./models/Upload');

const app = express();
const port = 3000;

// Set up EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/uploadProgress', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

// Serve the index page
app.get('/', (req, res) => {
    res.render('index');
});

// Handle file upload and progress
app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // Save file info to the database
    const newUpload = new Upload({
        filename: req.file.filename,
        fileSize: req.file.size,
    });
    await newUpload.save();

    res.render('progress', {
        filename: req.file.filename,
        fileSize: req.file.size,
    });
});

// Serve the progress page
app.get('/progress', (req, res) => {
    res.render('progress');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

