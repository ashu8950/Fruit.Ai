const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  imageUrl: { type: String, default: null }
});

module.exports = mongoose.model('FAQ', faqSchema);
