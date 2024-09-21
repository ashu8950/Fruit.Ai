const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  name: { type: String, required: true },  
  question: { type: String, required: true }, 
  answer: { type: String, required: true },  
  price: { type: Number, required: true },  
  imageUrl: { type: String, required: false },  
});

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
