import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ChatbotPage.css';
import chatbot from "../assets/chatbot.jpeg";

// Base URL for the API
const API_BASE_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const ChatbotPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);

  // Fetch FAQs from backend on component mount
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
        setError('Failed to load FAQs.');
      }
    };

    fetchFAQs();
  }, []);

  // Handle clicking on an FAQ
  const handleFAQClick = (faq) => {
    setShowChat(true);
    setMessages([
      { type: 'user', text: faq.question },
      {
        type: 'bot',
        text: `Here's information about : ${faq.question}`,
        details: faq.answer,
        image: faq.imageUrl // Use the relative URL from the FAQ
      }
    ]);
  };

  // Handle the search action (on button click)
  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faqs`);
      const filteredFAQ = response.data.find(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredFAQ) {
        setShowChat(true);
        setMessages([
          { type: 'user', text: searchQuery },
          {
            type: 'bot',
            text: `Here's information about ${filteredFAQ.question}:`,
            details: filteredFAQ.answer,
            image: filteredFAQ.imageUrl // Use the relative URL from the FAQ
          }
        ]);
      } else {
        setMessages([
          { type: 'user', text: searchQuery },
          { type: 'bot', text: `No Fruit found for "${searchQuery}".` }
        ]);
      }
    } catch (error) {
      console.error('Failed to search FAQs:', error);
      setError('Failed to search FAQs.');
    }
  };

  return (
    <div className="chatbot-page">
      <header className="header">
        <img src={chatbot} alt="Chatbot Logo" className="logo" />
        <h1 className="chatbot-name">Chatbot</h1>
      </header>

      <div className="chatbot-container">
        {error && <p className="error-message">{error}</p>}
        {showChat ? (
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' && <p>{msg.text}</p>}
                {msg.type === 'bot' && (
                  <div className="message-content">
                    <p className="question">{msg.text}</p>
                    <p className="answer">{msg.details}</p>
                    {msg.image && (
                      <img
                        src={`https://fruit-ai-oi8l.onrender.com/${msg.image}`} // Add base URL for images
                        alt="Detail"
                        className="message-image"
                        onError={(e) => {
                          e.target.src = 'https://fruit-ai-oi8l.onrender.com/uploads/default-image.jpg'; // Fallback image
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="content-list">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="faq-card"
                  onClick={() => handleFAQClick(faq)}
                >
                  <p className="faq-question">{faq.question}</p>
                  {faq.imageUrl && (
                    <img
                      src={`https://fruit-ai-oi8l.onrender.com/${faq.imageUrl}`} // Add base URL for images
                      alt={faq.question}
                      className="faq-image"
                      onError={(e) => {
                        e.target.src = 'https://fruit-ai-oi8l.onrender.com/uploads/default-image.jpg'; // Fallback image
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <input
          type="text"
          placeholder="Type a question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button className="send-button" onClick={handleSearch}>Send</button>
      </footer>
    </div>
  );
};

export default ChatbotPage;
