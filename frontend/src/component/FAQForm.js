import React, { useState } from 'react';
import { createFAQ } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../css/FAQForm.css';

const FAQForm = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      setNotification('Please select a valid image file.');
      return;
    }
    setImage(selectedFile);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('question', question);
    formData.append('answer', answer);
    if (image) {
      formData.append('image', image);
    }

    try {
      await createFAQ(formData);
      setNotification('FAQ added successfully!');
      setQuestion('');
      setAnswer('');
      setImage(null);
      setTimeout(() => {
        setNotification('');
        navigate('/faq');
      }, 2000);
    } catch (error) {
      setNotification('Failed to add FAQ.');
      console.error('Error adding FAQ:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="faq-form-container">
      <h2>Add New Fruit</h2>
      {notification && <p className="notification">{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Fruit:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Description:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
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
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  );
};

export default FAQForm;
