import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/FAQList.css';
import editIcon from '../assets/edit-icon.jpeg';
import deleteIcon from '../assets/delete-icon.jpeg';
import addIcon from '../assets/add.png';
import subIcon from '../assets/subtract.png';

const API_BASE_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const FAQList = () => {
  const [fruits, setFruits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getFruits = async () => {
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/faqs`);
        setFruits(response.data);
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError('Error fetching fruits.');
      } finally {
        setLoading(false);
      }
    };
    getFruits();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fruit?')) {
      try {
        await axios.delete(`${API_BASE_URL}/faqs/${id}`);
        setFruits(prevFruits => prevFruits.filter(fruit => fruit._id !== id)); // Use prevFruits for the most up-to-date state
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError('Error deleting fruit.');
      }
    }
  };

  const updateQuantity = (id, delta) => {
    setFruits(fruits.map(fruit => 
      fruit._id === id ? { ...fruit, quantity: Math.max(0, (fruit.quantity || 0) + delta) } : fruit
    ));
  };

  const goToHomePage = () => {
    navigate('/home');
  };

  return (
    <div className="faq-list-container">
      <button className="back-to-home-button" onClick={goToHomePage}>← Home</button>
      <h2>Fruit List</h2>
      {loading && <p>Loading fruits...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="scrollable-container">
        <ul className="faq-list">
          {fruits.map(fruit => (
            <li key={fruit._id} className="faq-item">
              <div className="left-section">
                <img
                  src={fruit.imageUrl ? `${API_BASE_URL}/${fruit.imageUrl}` : `${API_BASE_URL}/uploads/default-image.jpg`}
                  alt={fruit.name || 'Fruit Image'}
                  onError={(e) => e.target.src = `${API_BASE_URL}/uploads/default-image.jpg`}
                />
                <div className="name-price">
                  <h3>{fruit.name || 'Unnamed Fruit'}</h3>
                  <p className="price">${fruit.price}</p>
                </div>
              </div>

              <div className="middle-section">
                <p className="question"><strong>{fruit.question}</strong></p>
                <p className="benefits">{fruit.answer}</p>
                <div className="faq-buttons">
                  <Link to={`/edit-fruit/${fruit._id}`} className="edit-button">
                    <img src={editIcon} alt="Edit" className="edit-icon" />
                  </Link>
                  <button onClick={() => handleDelete(fruit._id)} className="delete-button">
                    <img src={deleteIcon} alt="Delete" className="delete-icon" />
                  </button>
                </div>
              </div>

              <div className="right-section">
                <div className="quantity-buttons">
                  <img
                    src={subIcon}
                    alt="Subtract"
                    onClick={() => updateQuantity(fruit._id, -1)}
                    className="quantity-button"
                  />
                  <p className="quantity-display">{fruit.quantity || 0}</p>
                  <img
                    src={addIcon}
                    alt="Add"
                    onClick={() => updateQuantity(fruit._id, 1)}
                    className="quantity-button"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/add-fruit" className="add-faq-button">Add New Fruit</Link>
    </div>
  );
};

export default FAQList;
