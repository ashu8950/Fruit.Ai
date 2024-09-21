import axios from 'axios';

const API_URL = 'https://fruit-ai-oi8l.onrender.com/api'

export const createFAQ = (formData) => {
  return axios.post(`${API_URL}/faqs`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const fetchFAQs = () => axios.get(`${API_URL}/faqs`);

export const fetchFAQById = (id) => axios.get(`${API_URL}/faqs/${id}`);

export const updateFAQ = (id, formData) => {
  return axios.put(`${API_URL}/faqs/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteFAQ = (id) => axios.delete(`${API_URL}/faqs/${id}`);
