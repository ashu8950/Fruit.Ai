const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FAQ = require('../models/faq');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only image files are allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

router.use('/uploads', express.static(uploadDir));

router.post('/faqs', upload.single('image'), async (req, res) => {
  try {
    const { name, question, answer, price } = req.body;
    const newFAQ = new FAQ({
      name,
      question,
      answer,
      price: parseFloat(price),
      imageUrl: req.file ? `uploads/${req.file.filename}` : null
    });
    const savedFAQ = await newFAQ.save();
    res.status(201).json(savedFAQ);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add fruit', error: err.message });
  }
});

router.get('/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fruits', error: err.message });
  }
});

router.get('/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch fruit', error: err.message });
  }
});

router.put('/faqs/:id', upload.single('image'), async (req, res) => {
  try {
    const existingFAQ = await FAQ.findById(req.params.id);
    if (!existingFAQ) return res.status(404).json({ message: 'Fruit not found' });

    const updatedFAQ = {
      name: req.body.name || existingFAQ.name,
      question: req.body.question || existingFAQ.question,
      answer: req.body.answer || existingFAQ.answer,
      price: req.body.price !== undefined ? parseFloat(req.body.price) : existingFAQ.price,
      imageUrl: req.file ? `uploads/${req.file.filename}` : existingFAQ.imageUrl
    };

    const faq = await FAQ.findByIdAndUpdate(req.params.id, updatedFAQ, { new: true });
    res.status(200).json(faq);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update fruit', error: err.message });
  }
});

router.delete('/faqs/:id', async (req, res) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ message: 'Fruit not found' });

    if (faq.imageUrl) {
      const imagePath = path.join(__dirname, '../uploads', path.basename(faq.imageUrl));
      fs.unlink(imagePath, (err) => {
        if (err) console.error('Failed to delete image file:', err);
      });
    }

    res.status(200).json({ message: 'Fruit deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete fruit', error: err.message });
  }
});

module.exports = router;
