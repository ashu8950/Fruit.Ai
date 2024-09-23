
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const faqRoutes = require('./routes/faq');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [process.env.CLIENT_URL || 'https://fruitsai.netlify.app','http://localhost:3000'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle root path
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Use the FAQ routes under '/api'
app.use('/api', faqRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 60000,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Fallback route for 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
