import React, { useState } from 'react';
import { createFAQ } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/FAQForm.css';

const FAQForm = () => {
  const [name, setName] = useState('');
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState(''); 
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setNotification('Please select a valid image file.');
      return;
    }
    setImage(selectedFile);
  };

  const resetForm = () => {
    setName('');
    setQuestion('');
    setAnswer('');
    setPrice('');
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('question', question);
    formData.append('answer', answer);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createFAQ(formData);
      setNotification('Fruit added successfully!');
      resetForm();
      setTimeout(() => {
        setNotification('');
        navigate('/faq');
      }, 2000);
    } catch (error) {
      console.error('Error adding fruit:', error);
      setNotification(error.response?.data.message || 'Failed to add fruit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="faq-form-container">
      <h2>Add New Fruit</h2>
      {notification && <p className="notification">{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Fruit Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Fruit Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Fruit Answer:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (in USD):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (optional):</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Fruit'}
        </button>
      </form>
    </div>
  );
};

export default FAQForm;
