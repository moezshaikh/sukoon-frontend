import React, { useState, useEffect, useRef } from 'react';
import '../style/Navbar.css';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setDropdownOpen(false);
      navigate('/');
    });
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-brand">S</div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="/chat">Chat</a></li>
        <li><a href="/resources">Resources</a></li>
        <li><a href="/help">Help</a></li>

        {!user ? (
          <li><Link to="/login" className="login-btn">Sign In / Login </Link></li>
        ) : (
          <li className="user-dropdown" ref={dropdownRef}>
            <div className="user-icon" onClick={toggleDropdown}>
              <User size={18} />
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p className="user-email">{user.email}</p>
                <Link to="/upgrade" className="dropdown-link">Upgrade Plan</Link>
                <Link to="/settings" className="dropdown-link">Settings</Link>
                <Link to="/contact" className="dropdown-link">Contact Us</Link>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
