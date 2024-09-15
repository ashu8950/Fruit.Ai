import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Replaced fetchFAQs and deleteFAQ imports with axios
import '../css/FAQList.css';

// Base URL for the API
const API_BASE_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch FAQs from the backend on component mount
  useEffect(() => {
    const getFAQs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        setError('Error fetching Fruits.');
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    getFAQs();
  }, []);

  // Handle delete FAQ
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Fruit?')) {
      try {
        await axios.delete(`${API_BASE_URL}/faqs/${id}`);
        setFaqs(faqs.filter(faq => faq._id !== id));
      } catch (error) {
        setError('Error deleting Fruit.');
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  return (
    <div className="faq-list-container">
      <h2>Fruit List</h2>
      <Link to="/add-faq" className="add-faq-button">Add New Fruits</Link>

      {loading && <p>Loading Fruits...</p>}
      {error && <p className="error-message">{error}</p>}

      {faqs.length > 0 ? (
        <ul className="faq-list">
          {faqs.map(faq => (
            <li key={faq._id} className="faq-item">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
              {faq.imageUrl && (
                <img
                  src={`https://fruit-ai-oi8l.onrender.com/${faq.imageUrl}`} // Add base URL for images
                  alt={faq.question}
                  onError={(e) => {
                    e.target.src = 'https://fruit-ai-oi8l.onrender.com/uploads/default-image.jpg'; // Fallback image
                  }}
                />
              )}
              <div className="faq-buttons">
                <Link to={`/edit-faq/${faq._id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(faq._id)} className="delete-button">Delete</button>
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
