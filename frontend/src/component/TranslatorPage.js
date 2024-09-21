import React, { useState } from 'react';
import axios from 'axios';
import "../css/Translator.css";

const TranslatorPage = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("hi");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableLanguages = [
    { name: "Afrikaans", code: "af" },
    { name: "Arabic", code: "ar" },
    { name: "Chinese (Simplified)", code: "zh-Hans" },
    { name: "Chinese (Traditional)", code: "zh-Hant" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Estonian", code: "et" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Indonesian", code: "id" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Korean", code: "ko" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Norwegian", code: "no" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Spanish", code: "es" },
    { name: "Swedish", code: "sv" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Ukrainian", code: "uk" },
    { name: "Vietnamese", code: "vi" },
  ];

  const translateText = async () => {
    if (!inputText) return;

    setLoading(true);
    setError(null);

    try {
      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: { 'to': targetLanguage, 'api-version': '3.0', 'from': sourceLanguage, 'textType': 'plain' },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'a2cce9204fmsh13d277fd68f91a0p1bfc64jsn438c666083cd',
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        data: [{ Text: inputText }]
      };

      const response = await axios.request(options);
      const translation = response.data[0].translations[0].text;
      setTranslatedText(translation);
    } catch (err) {
      setError('Error during translation');
    }

    setLoading(false);
  };

  return (
    <div className="translator-container">
      <h1 className="translator-title">Multi-Language Translator</h1>

      <label htmlFor="source-language">From:</label>
      <select
        id="source-language"
        value={sourceLanguage}
        onChange={(e) => setSourceLanguage(e.target.value)}
        className="language-selector"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <label htmlFor="target-language">To:</label>
      <select
        id="target-language"
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="language-selector"
      >
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to translate..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="translator-input"
      />

      <button onClick={translateText} className="translate-button">
        {loading ? "Translating..." : "Translate"}
      </button>

      {error && <p className="error-message">{error}</p>}

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
