import React, { useState } from 'react';
import "../css/Translator.css"; // Assuming you have your CSS file

// Import the JSON file
import dictionaryData from '../dictionaries/dictionaries.json';

const TranslatorPage = () => {
  const [inputText, setInputText] = useState(""); // Input text state
  const [translatedText, setTranslatedText] = useState(""); // Translated text state
  const [sourceLanguage, setSourceLanguage] = useState("english"); // Default source language
  const [targetLanguage, setTargetLanguage] = useState("hindi"); // Default target language
  const [error, setError] = useState(null); // For handling errors

  // List of available languages (based on the dictionary data)
  const availableLanguages = ["english", "hindi", "spanish"];

  // Create dictionaries for quick lookup
  const createDictionary = (sourceLang, targetLang) => {
    return dictionaryData.words.reduce((dict, entry) => {
      const key = entry[sourceLang];
      if (key) {
        dict[key.toLowerCase()] = entry[targetLang];
      }
      return dict;
    }, {});
  };

  // Function to handle translation
  const translateText = () => {
    if (sourceLanguage === targetLanguage) {
      setTranslatedText(inputText);
      return;
    }

    // Create dictionaries based on selected languages
    const dictionary = createDictionary(sourceLanguage, targetLanguage);

    const words = inputText.toLowerCase().split(/\s+/); // Split by spaces and handle multiple spaces
    let translation = "";

    for (let word of words) {
      // Find the word in the dictionary
      if (dictionary[word]) {
        // If the word is found, get the translation
        translation += dictionary[word] + " ";
      } else {
        // If the word is not found, retain the original word
        translation += word + " ";
      }
    }

    setTranslatedText(translation.trim());
    setError(null); // Clear any previous errors
  };

  return (
    <div className="translator-container">
      <h1 className="translator-title">Multi-Language Translator</h1>

      {/* Source Language Selection */}
      <label htmlFor="source-language">From:</label>
      <select 
        id="source-language"
        value={sourceLanguage} 
        onChange={(e) => setSourceLanguage(e.target.value)} 
        className="language-selector"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>

      {/* Target Language Selection */}
      <label htmlFor="target-language">To:</label>
      <select 
        id="target-language"
        value={targetLanguage} 
        onChange={(e) => setTargetLanguage(e.target.value)} 
        className="language-selector"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>

      {/* Input text area */}
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="translator-input"
      />

      {/* Translate button */}
      <button onClick={translateText} className="translate-button">
        Translate
      </button>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Output section for translated text */}
      {translatedText && (
        <div className="translated-output">
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslatorPage;
