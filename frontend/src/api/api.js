import axios from 'axios';

// Define the updated API URL
const API_URL = 'https://fruit-ai-oi8l.onrender.com/api';

// Create a new FAQ
export const createFAQ = (formData) => {
  return axios.post(`${API_URL}/faqs`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Fetch all FAQs
export const fetchFAQs = () => axios.get(`${API_URL}/faqs`);

// Fetch a specific FAQ by ID
export const fetchFAQById = (id) => axios.get(`${API_URL}/faqs/${id}`);

// Update an existing FAQ
export const updateFAQ = (id, formData) => {
  return axios.put(`${API_URL}/faqs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Delete an FAQ by ID
export const deleteFAQ = (id) => axios.delete(`${API_URL}/faqs/${id}`);
