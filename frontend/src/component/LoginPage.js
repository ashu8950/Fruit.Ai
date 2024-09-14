import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faPinterestP, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import '../css/LoginPage.css';

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  

  const handleLogin = () => {
    if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
      alert('Login Successful');
      navigate('/home');  
    } else {
      alert('Invalid Credentials');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>By signing in you are agreeing to our <a href="#">Term and privacy policy</a></p>
      <div className="tab-container">
        <span className="active-tab">Login</span>
        <span className="tab">Register</span>
      </div>
      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} className="icon" />
        <input
          type="email"
          placeholder="Email Address"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
      </div>
      <div className="input-group">
        <FontAwesomeIcon icon={faLock} className="icon" />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className="icon-toggle"
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <div className="extras">
        <label>
          <input type="checkbox" /> Remember password
        </label>
        <a href="#" className="forget-password">Forget password</a>
      </div>
      <button className="login-btn" onClick={handleLogin}>Login</button>
      <p>or connect with</p>
      <div className="social-icons">
        <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        <FontAwesomeIcon icon={faPinterestP} className="social-icon" />
        <FontAwesomeIcon icon={faLinkedinIn} className="social-icon" />
      </div>
    </div>
  );
}

export default LoginPage;
