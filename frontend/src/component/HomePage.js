import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import chat from "../assets/chat.jpeg";
import about from "../assets/about.jpeg";
import faqImage from "../assets/faqImage.jpeg";
import translator from "../assets/translator.jpeg";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <div className="header">
          <h1>Fruit.AI</h1>
          <p>"Be Healthy!"</p>
        </div>
        <div className="buttons">
          <Link to="/chatbot" className="button chat">
            <img src={chat} alt="Chat" />
            <p>Chat</p>
            <span className="anonymous">Anonymous</span>
          </Link>
          <Link to="/translator" className="button translate">
            <img src={translator} alt="Translate" />
            <p>Translate</p>
          </Link>
          <Link to="/faq" className="button faq">
            <img src={faqImage} alt="FAQs" />
            <p>FAQs</p>
          </Link>
          <Link to="/about" className="button about">
            <img src={about} alt="About" />
            <p>About</p>
          </Link>
        </div>
      </div>
      <div className="footer">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default HomePage;
