import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFAQs, updateFAQ } from '../api/api';
import '../css/FAQDisplay.css';

const FAQDisplay = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [fruitName, setFruitName] = useState('');
  const [description, setDescription] = useState(''); // Description
  const [benefits, setBenefits] = useState(''); // Benefits
  const [price, setPrice] = useState(''); // Price
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for async operations
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const getFAQ = async () => {
        try {
          const response = await fetchFAQs();
          const faqData = response.data.find(faq => faq._id === id);
          if (faqData) {
            setFaq(faqData);
            setFruitName(faqData.name);
            setDescription(faqData.question); 
            setBenefits(faqData.answer);
            setPrice(faqData.price);
          }
        } catch (error) {
          setNotification('Error fetching FAQ details.');
        }
      };

      getFAQ();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', fruitName);
    formData.append('description', description);
    formData.append('benefits', benefits);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      await updateFAQ(id, formData);
      setNotification('FAQ updated successfully!');
      setTimeout(() => navigate('/faq'), 2000);
    } catch (error) {
      setNotification('Failed to update FAQ.');
    } finally {
      setIsLoading(false);
    }
  };

  if (id && !faq) return <p>Loading...</p>;

  return (
    <div className="faq-details-container">
      <h2>{id ? 'Edit Fruit' : 'Add Fruit'}</h2>
      {notification && <p className="notification">{notification}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fruitName">Fruit Name:</label>
          <input
            type="text"
            id="fruitName"
            value={fruitName}
            onChange={(e) => setFruitName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="benefits">Benefits:</label>
          <textarea
            id="benefits"
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
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
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : id ? 'Update Fruit' : 'Add Fruit'}
        </button>
      </form>
      <button onClick={() => navigate('/faq')} className="back-button">Back to List</button>
    </div>
  );
};

export default FAQDisplay;
