import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFAQs, updateFAQ } from '../api/api'; // Correct import
import '../css/FAQDisplay.css';

const FAQDisplay = () => {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getFAQ = async () => {
      try {
        const response = await fetchFAQs();
        const faqData = response.data.find(faq => faq._id === id);
        if (faqData) {
          setFaq(faqData);
          setQuestion(faqData.question);
          setAnswer(faqData.answer);
          // Assuming image URL is stored in faq.imageUrl
        }
      } catch (error) {
        console.error('Error fetching FAQ:', error);
      }
    };

    getFAQ();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('question', question);
      formData.append('answer', answer);
      if (image) {
        formData.append('image', image);
      }

      await updateFAQ(id, formData);
      setNotification('Fruit updated successfully!');
      setTimeout(() => navigate('/faq'), 2000); // Redirect to FAQ list after 2 seconds
    } catch (error) {
      setNotification('Failed to update Fruit.');
      console.error('Error updating Fruit:', error.response ? error.response.data : error.message);
    }
  };

  if (!faq) return <p>Loading...</p>;

  return (
    <div className="faq-details-container">
      <h2>Edit Fruit</h2>
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
          <label htmlFor="answer">Discription:</label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Update Fruit</button>
      </form>
      <button onClick={() => navigate('/faq')} className="back-button">Back to List</button>
    </div>
  );
};

export default FAQDisplay;
