// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/home';
import Chat from './Pages/chat';
import JournalPage from './Pages/JournalPage';
import Resource from './Pages/resource';
import Expert from './Pages/Expert';
import Help from './Pages/help';
import Login from './Pages/Login'; // Your login page

function App() {
  const [user, setUser] = useState(null);

// Example: using Firebase Auth
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);  // Logged-in
    } else {
      setUser(null);  // Guest
    }
  });
  return () => unsubscribe();
}, []);


  return (
    <Router>
      <Navbar user={user} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/resources" element={<Resource />} />
          <Route path="/expert" element={<Expert />} />
          <Route path="/help" element={<Help />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
