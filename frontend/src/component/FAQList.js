import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFAQs, deleteFAQ } from '../api/api'; // Correct import path
import '../css/FAQList.css';

const FAQList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const getFAQs = async () => {
      try {
        const response = await fetchFAQs();
        setFaqs(response.data);
      } catch (error) {
        setError('Error fetching FAQs.');
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    getFAQs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFAQ(id);
        setFaqs(faqs.filter(faq => faq._id !== id));
      } catch (error) {
        setError('Error deleting FAQ.');
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
              {faq.imageUrl && <img src={`http://localhost:5000/${faq.imageUrl}`} alt={faq.question} />}
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
