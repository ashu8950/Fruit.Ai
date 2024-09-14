import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import FAQList from './FAQList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import specific icon
import '../css/FAQPage.css'; // Import CSS

const FAQPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleBackClick = () => {
    navigate('/home'); // Navigate to home page
  };

  return (
    <div className="faq-page-container">
      <FAQList />
    </div>
  );
};

export default FAQPage;
