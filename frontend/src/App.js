// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './component/LoginPage';
import HomePage from './component/HomePage';
import FAQForm from './component/FAQForm';
import FAQPage from './component/FAQPage';
import ChatbotPage from './component/ChatbotPage';
import TranslatorPage from './component/TranslatorPage';
import AboutPage from './component/AboutPage';
import FAQDisplay from './component/FAQDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/add-faq" element={<FAQForm />} />
        <Route path="/edit-faq/:id" element={<FAQDisplay />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/translator" element={<TranslatorPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
