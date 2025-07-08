// components/LoginPromptModal.jsx
import React from 'react';
import '../style/modal.css';

const LoginPromptModal = ({ onClose, onLogin }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Join Sukoon for Free</h2>
        <p>Log in or sign up to save your progress. Or continue as guest.</p>
        <div className="modal-buttons">
          <button onClick={onLogin} className="modal-btn login">Login / Sign Up</button>
          <button onClick={onClose} className="modal-btn guest">Continue as Guest</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
