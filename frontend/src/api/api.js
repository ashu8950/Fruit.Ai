import axios from 'axios';

// Define API URL
const API_URL = 'http://localhost:5000/api';

export const createFAQ = (formData) => {
  return axios.post(`${API_URL}/faqs`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const fetchFAQs = () => axios.get(`${API_URL}/faqs`);

export const fetchFAQById = (id) => axios.get(`${API_URL}/faqs/${id}`);

export const updateFAQ = (id, formData) => axios.put(`${API_URL}/faqs/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const deleteFAQ = (id) => axios.delete(`${API_URL}/faqs/${id}`);
