import axios from 'axios';

// Define API URL
const API_URL = 'http://localhost:5000/api';

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

// Update a specific FAQ by ID
export const updateFAQ = (id, formData) => axios.put(`${API_URL}/faqs/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Delete a specific FAQ by ID
export const deleteFAQ = (id) => axios.delete(`${API_URL}/faqs/${id}`);

// Search FAQs by query
export const searchFAQs = (query) => axios.get(`${API_URL}/faqs/search`, {
  params: { q: query }
});
