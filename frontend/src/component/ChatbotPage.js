import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../css/ChatbotPage.css';
import chatbot from "../assets/chatbot.jpeg";
import addIcon from '../assets/add.png'; 
import subIcon from '../assets/subtract.png'; 
import defaultImg from '../assets/default.avif';

const API_BASE_URL = 'https://fruit-ai-oi8l.onrender.com/api';

const ChatbotPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error.response?.data || error.message);
        setError('Failed to load FAQs.');
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFAQClick = (faq) => {
    setShowChat(true);
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: faq.question },
      {
        type: 'bot',
        text: faq.question,
        details: faq.answer,
        image: faq.imageUrl,
        name: faq.name,
        price: faq.price,
        quantity: 0,
      }
    ]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Avoid searching with empty input

    setShowChat(true);
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: searchQuery }
    ]);

    try {
      const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.price.toString().includes(searchQuery)
      );

      if (filteredFAQs.length > 0) {
        filteredFAQs.forEach(faq => {
          setMessages(prevMessages => [
            ...prevMessages,
            {
              type: 'bot',
              text: faq.question,
              details: faq.answer,
              image: faq.imageUrl,
              name: faq.name,
              price: faq.price,
              quantity: 0,
            }
          ]);
        });
      } else {
        setMessages(prevMessages => [
          ...prevMessages,
          { type: 'bot', text: `No information found for "${searchQuery}".` }
        ]);
      }
    } catch (error) {
      console.error('Failed to search FAQs:', error);
      setError('Failed to search FAQs.');
    } finally {
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const updateQuantity = (index, delta) => {
    setMessages(messages.map((msg, idx) => 
      idx === index ? { ...msg, quantity: Math.max(0, (msg.quantity || 0) + delta) } : msg
    ));
  };

  return (
    <div className="chatbot-page">
      <header className="header">
        <img src={chatbot} alt="Chatbot Logo" className="logo" />
        <h1 className="chatbot-name">Chatbot</h1>
      </header>

      <div className="chatbot-container">
        {error && <p className="error-message">{error}</p>}
        {loading ? (
          <p>Loading FAQs...</p>
        ) : showChat ? (
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.type === 'user' && <span>{msg.text}</span>}
                {msg.type === 'bot' && (
                  <div className="faq-item">
                    {msg.details ? (
                      <>
                        <div className="left-section">
                          {msg.image && (
                            <img
                              src={`${API_BASE_URL}/${msg.image}`}
                              alt="Detail"
                              className="faq-image"
                              onError={(e) => {
                                e.target.src = defaultImg; 
                              }}
                            />
                          )}
                          <div className="name-price">
                            <h3>{msg.name}</h3>
                            <p className="price">${msg.price}</p>
                          </div>
                        </div>

                        <div className="middle-section">
                          <span className="question"><strong>{msg.text}</strong></span>
                          <span className="answer">{msg.details}</span>
                        </div>

                        <div className="right-section">
                          <div className="quantity-buttons">
                            <img
                              src={subIcon}
                              alt="Subtract"
                              onClick={() => updateQuantity(index, -1)}
                              className="quantity-button"
                              aria-label="Decrease quantity"
                            />
                            <p className="quantity-display">{msg.quantity}</p>
                            <img
                              src={addIcon}
                              alt="Add"
                              onClick={() => updateQuantity(index, 1)}
                              className="quantity-button"
                              aria-label="Increase quantity"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <span className="no-info">{msg.text}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
        ) : (
          <div className="content-list">
            <div className="faq-list">
              {faqs.map((faq) => (
                <div
                  key={faq._id} // Ensure this is a unique ID
                  className="faq-card"
                  onClick={() => handleFAQClick(faq)}
                >
                  <span className="faq-question">{faq.question}</span>
                  {faq.imageUrl && (
                    <img
                      src={`${API_BASE_URL}/${faq.imageUrl}`}
                      alt={faq.question}
                      className="faq-image"
                      onError={(e) => {
                        e.target.src = defaultImg; 
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
          onKeyPress={handleKeyPress}
          className="search-input"
          aria-label="Search FAQ"
        />
        <button className="send-button" onClick={handleSearch}>Send</button>
      </footer>
    </div>
  );
};

export default ChatbotPage;
