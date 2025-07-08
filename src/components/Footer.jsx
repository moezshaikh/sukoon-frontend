import React from 'react';
import '../style/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p className="footer-brand">© 2025 Sukooon. All rights reserved.</p>
        <p className="footer-message">Your Mental Health Matters 💙</p>
      </div>

      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/disclaimer">Mental Health Disclaimer</a>
        <a href="/contact">Contact Us</a>
        <a href="/feedback">Send Feedback</a>
      </div>

      <div className="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>

      <div className="footer-credit">
        <p>- by <a href="https://www.linkedin.com/in/moezshaikh/" target="_blank" rel="noopener noreferrer">Moez Shaikh</a></p>
      </div>
    </footer>
  );
}

export default Footer;
