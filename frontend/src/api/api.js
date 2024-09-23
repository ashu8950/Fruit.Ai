import axios from 'axios';

const API_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const handleError = (error) => {
  if (error.response) {
    console.error('Error Response:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('Error Request:', error.request);
    throw new Error('No response received from server');
  } else {
    console.error('Error Message:', error.message);
    throw new Error(error.message);
  }
};

export const createFAQ = async (formData) => {
  try {
    return await axios.post(`${API_URL}/faqs`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (error) {
    handleError(error);
  }
};

export const fetchFAQs = async () => {
  try {
    return await axios.get(`${API_URL}/faqs`);
  } catch (error) {
    handleError(error);
  }
};

export const fetchFAQById = async (id) => {
  try {
    return await axios.get(`${API_URL}/faqs/${id}`);
  } catch (error) {
    handleError(error);
  }
};

export const updateFAQ = async (id, formData) => {
  try {
    return await axios.put(`${API_URL}/faqs/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (error) {
    handleError(error);
  }
};

export const deleteFAQ = async (id) => {
  try {
    return await axios.delete(`${API_URL}/faqs/${id}`);
  } catch (error) {
    handleError(error);
  }
};
