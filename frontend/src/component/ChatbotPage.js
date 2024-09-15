import React, { useState } from 'react';
import fruits from '../component/fruits'; // Import fruit data from fruits.js
import '../css/ChatbotPage.css';
import chatbot from "../assets/chatbot.jpeg";

const ChatbotPage = () => {
  const [searchQuery, setSearchQuery] = useState(''); // For user input
  const [messages, setMessages] = useState([]); // Chat messages

  // Function to handle sending of the search query
  const handleSend = () => {
    const query = searchQuery.trim();
    if (query === '') return; // Do nothing if input is empty

    // Add user's message to the chat
    setMessages(prevMessages => [...prevMessages, { type: 'user', text: query }]);
    setSearchQuery(''); // Clear input field

    // Search for the fruit in the fruits array
    let responseText = '';
    let imageUrl = '';

    // Search for a match in the fruits array
    const fruitMatch = fruits.find(fruit => fruit.name.toLowerCase() === query.toLowerCase());
    if (fruitMatch) {
      // If match is found, display fruit details
      responseText = fruitMatch.details; // Just details
      imageUrl = fruitMatch.image; // URL of the fruit image
    } else {
      // If no match is found
      responseText = 'Sorry, no information available for that fruit.';
    }

    // Add bot's response to the chat
    setMessages(prevMessages => [...prevMessages, { type: 'bot', fruitName: query, details: responseText, image: imageUrl }]);
  };

  return (
    <div className="chatbot-page">
      <header className="header">
        <img src={chatbot} alt="Chatbot Logo" className="logo" />
        <h1 className="chatbot-name">Chatbot</h1>
      </header>
      <div className="chatbot-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.type === 'bot' && (
                <div className="message-content">
                  {msg.fruitName && <p className="fruit-name">{msg.fruitName}</p>}
                  {msg.details && <p className="fruit-details">{msg.details}</p>}
                  {msg.image && <img src={msg.image} alt="Related content" className="message-image" />}
                </div>
              )}
              {msg.type === 'user' && <p>{msg.text}</p>}
            </div>
          ))}
        </div>
      </div>
      <footer className="footer">
        <input 
          type="text" 
          placeholder="Type a fruit name..." 
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
