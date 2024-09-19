const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FAQ = require('../models/faq');

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Correct path to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Correct template literal syntax
  }
});

// Optional: Validate file type and size
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 1024 * 1024 } // 1MB size limit
});

// Serve static files from the uploads directory
router.use('/uploads', express.static(uploadDir));

// Create a new FAQ
router.post('/faqs', upload.single('image'), async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFAQ = new FAQ({
      question,
      answer,
      imageUrl: req.file ? `uploads/${req.file.filename}` : null // Save relative URL
    });
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (err) {
    console.error('Failed to add FAQ:', err);
    res.status(500).json({ message: 'Failed to add FAQ', error: err.message });
  }
});

// Get all FAQs
router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    console.error('Failed to fetch FAQs:', err);
    res.status(500).json({ message: 'Failed to fetch FAQs', error: err.message });
  }
});

// Get a specific FAQ by ID
router.get('/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.status(200).json(faq);
  } catch (err) {
    console.error('Failed to fetch FAQ:', err);
    res.status(500).json({ message: 'Failed to fetch FAQ', error: err.message });
  }
});

// Update a specific FAQ by ID
router.put('/faqs/:id', upload.single('image'), async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updatedFAQ = {
      question,
      answer,
      imageUrl: req.file ? `uploads/${req.file.filename}` : req.body.imageUrl // Use existing URL if no new file
    };
    const faq = await FAQ.findByIdAndUpdate(req.params.id, updatedFAQ, { new: true });
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.status(200).json(faq);
  } catch (err) {
    console.error('Failed to update FAQ:', err);
    res.status(500).json({ message: 'Failed to update FAQ', error: err.message });
  }
});

// Delete a specific FAQ by ID (and remove associated image file)
router.delete('/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });

    // Delete associated image file if it exists
    if (faq.imageUrl) {
      const imagePath = path.join(__dirname, '../', faq.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to delete image file:', err);
      });
    }

    res.status(200).json({ message: 'FAQ deleted successfully' });
  } catch (err) {
    console.error('Failed to delete FAQ:', err);
    res.status(500).json({ message: 'Failed to delete FAQ', error: err.message });
  }
});

module.exports = router;
