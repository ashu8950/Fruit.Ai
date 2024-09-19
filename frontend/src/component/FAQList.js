import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import axios from 'axios';
import '../css/FAQList.css';

const API_BASE_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const FAQList = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const getFruits = async () => {
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/faqs`);
        setFruits(response.data);
      } catch (error) {
        setError('Error fetching Fruits.');
      } finally {
        setLoading(false);
      }
    };
    getFruits();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Fruit?')) {
      try {
        await axios.delete(`${API_BASE_URL}/faqs/${id}`);
        setFruits(fruits.filter(fruit => fruit._id !== id));
      } catch (error) {
        setError('Error deleting Fruit.');
      }
    }
  };

  const goToHomePage = () => {
    navigate('/home');  // Navigate to home page
  };

  return (
    <div className="faq-list-container">
      <button className="back-to-home-button" onClick={goToHomePage}>← Home</button>

      <h2>Fruit List</h2>
      <Link to="/add-fruit" className="add-faq-button">Add New Fruit</Link>

      {loading && <p>Loading Fruits...</p>}
      {error && <p className="error-message">{error}</p>}

      {fruits.length > 0 ? (
        <ul className="faq-list">
          {fruits.map(fruit => (
            <li key={fruit._id} className="faq-item">
              <h3>{fruit.question}</h3>
              <p>{fruit.answer}</p>
              <img
                src={fruit.imageUrl ? `${API_BASE_URL}/${fruit.imageUrl}` : `${API_BASE_URL}/uploads/default-image.jpg`}
                alt={fruit.question}
                onError={(e) => e.target.src = `${API_BASE_URL}/uploads/default-image.jpg`}
              />
              <div className="faq-buttons">
                <Link to={`/edit-fruit/${fruit._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(fruit._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No Fruits available.</p>
      )}
    </div>
  );
};

export default FAQList;
