import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import fruits from '../component/fruits';  // Import fruit data
import '../css/ChatbotPage.css';

// Define API URL
const API_URL = 'http://localhost:5000/api';

const ChatbotPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFAQs] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getFAQs = async () => {
      try {
        const response = await axios.get(`${API_URL}/faqs`);
        if (response.data && Array.isArray(response.data)) {
          setFAQs(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setMessages([...messages, { type: 'bot', text: 'Error occurred while fetching FAQs.' }]);
      }
    };

    getFAQs();
  }, []);

  const handleSend = async () => {
    const query = searchQuery.trim();
    if (query === '') return;

    setMessages([...messages, { type: 'user', text: query }]);
    setSearchQuery('');

    let responseText = '';

    try {
      // Search FAQs
      const faqResponse = await axios.get(`${API_URL}/faqs/search`, {
        params: { q: query }
      });

      const faqData = faqResponse.data;
      if (faqData && Array.isArray(faqData)) {
        if (faqData.length > 0) {
          responseText = `FAQs found: ${faqData.map(faq => faq.question).join(', ')}`;
        } else {
          // Search Fruits
          const fruitMatch = fruits.find(fruit => fruit.name.toLowerCase().includes(query.toLowerCase()));
          if (fruitMatch) {
            responseText = `Fruit found: ${fruitMatch.name} - ${fruitMatch.details}`;
          } else {
            // Find similar FAQs
            const similarFAQ = faqs.filter(faq => faq.question.toLowerCase().includes(query.toLowerCase().substring(0, 3)));
            if (similarFAQ.length > 0) {
              responseText = `Similar FAQs found: ${similarFAQ.map(faq => faq.question).join(', ')}`;
            } else {
              // Find similar Fruits
              const similarFruit = fruits.filter(fruit => fruit.name.toLowerCase().includes(query.toLowerCase().substring(0, 3)));
              if (similarFruit.length > 0) {
                responseText = `Similar fruits found: ${similarFruit.map(fruit => fruit.name).join(', ')}`;
              } else {
                responseText = 'Sorry, no data found.';
              }
            }
          }
        }
      } else {
        responseText = 'Error: Unexpected response format.';
      }
    } catch (error) {
      console.error('Error during search:', error);
      responseText = 'Error occurred during search.';
    }

    setMessages([...messages, { type: 'bot', text: responseText }]);
  };

  return (
    <div className="chatbot-page">
      <header className="header">
        <img src="/path/to/logo.png" alt="Chatbot Logo" className="logo" />
        <h1 className="chatbot-name">Chatbot</h1>
      </header>
      <div className="chatbot-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="search-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </footer>
    </div>
  );
};

export default ChatbotPage;
