import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  BookOpen,
  UserCheck,
  Phone,
  Brain,
  Shield
} from 'lucide-react';
import '../style/home.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToJournal = () => {
    navigate('/journal');
  };

  const handleTherapyClick = () => {
    navigate('/chat');
  };

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 300);
  }, []);

  const [currentWord, setCurrentWord] = useState(0);
  const taglineWords = ["Find", "Your", "Peace", "Within"];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % taglineWords.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const taglines = [
    "It’s okay to not be okay.",
    "You’re not alone. I'm here to listen.",
    "Breathe. You’re safe here.",
    "Your feelings are valid. Let’s talk about them.",
    "This moment will pass. Let’s take it one breath at a time.",
    "You don’t have to carry this alone.",
    "Speak your heart. Sukoon is listening.",
    "No judgment. Just understanding.",
    "Sometimes, the first step is just saying how you feel.",
    "Healing begins with honesty — even if it’s messy.",
  ];
  const [currentTagline, setCurrentTagline] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const situations = [
    {
      title: "Coping with a Breakup",
      description: "A difficult ending can be the beginning of emotional healing.",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
      buttonColor: "bg-rose-500 hover:bg-rose-600"
    },
    {
      title: "Unreciprocated Feelings",
      description: "Understanding your emotions with kindness and acceptance.",
      icon: MessageCircle,
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
      buttonColor: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Family Struggles",
      description: "Navigating emotional distance and family conflicts with care.",
      icon: Brain,
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      title: "Work-Related Stress",
      description: "Finding calm and clarity amidst professional pressures.",
      icon: Shield,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      buttonColor: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  const [index, setIndex] = useState(0);
  const previewCards = [
    {
      title: "Coping with Anxiety",
      description: "Short exercises to manage overthinking and anxiety symptoms.",
      color: "#ecfdf5",
      textColor: "#065f46",
    },
  ];

  const cardCount = previewCards.length;
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % cardCount);
    }, 4000);
  };

  const pauseSlide = () => clearInterval(intervalRef.current);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="logo-container">
            <h1 className="logo-text">Sukoon</h1>
          </div>
          <div className="tagline-rotator">
            {taglines.map((line, index) => (
              <span key={index} className={`tagline-line ${index === currentTagline ? 'active' : ''}`}>
                {line}
              </span>
              
            ))}
             <button className="cta-button" onClick={handleTherapyClick}>
            Start with Sukoon
          </button>
          </div>
        </div>
      </div>

     {/* Core Features */}
<section className="features">
  <h2>How Sukoon Helps</h2>
  <div className="feature-cards">
    <div className="card">
      <div className="card-icon">🧠</div>
      <div className="card-title">AI Therapy Chat</div>
      <div className="card-subtitle">Talk to someone 24/7</div>
      <div className="card-description">
        Your personal space to express emotions, ask questions, or just feel heard with our AI therapist.
      </div>
    </div>

    <div className="card">
      <div className="card-icon">📘</div>
      <div className="card-title">Self-Help Guides</div>
      <div className="card-subtitle">Learn and grow</div>
      <div className="card-description">
        Short, effective guides on anxiety, self-esteem, grounding techniques, and more.
      </div>
    </div>
    <div className="card">
  <div className="card-icon">🎧</div>
  <div className="card-title">Audio Relaxation</div>
  <div className="card-subtitle">Calm your mind</div>
  <div className="card-description">
    Listen to meditative sounds, calming recitations, or ambient music to relieve stress and anxiety.
  </div>
</div>

<div className="card">
  <div className="card-icon">🌙</div>
  <div className="card-title">Daily Reflections</div>
  <div className="card-subtitle">End your day mindfully</div>
  <div className="card-description">
    Answer nightly questions or use gentle prompts to reflect, unwind, and sleep with clarity.
  </div>
</div>

  </div>
</section>

      {/* We're Here For You Section */}
      <div className="featured-wrapper">
        <div className="featured-header">
          <h2 className="featured-title">We're Here for You</h2>
          <p className="featured-description">
            Whatever you're going through, our AI therapist provides personalized support for your unique situation
          </p>
        </div>

        <div className="featured-grid">
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <div key={index} className={`featured-card ${situation.bgColor}`}>
                <div className={`icon-wrapper ${situation.color}`}>
                  <Icon className="icon" />
                </div>
                <h3 className="situation-title">{situation.title}</h3>
                <p className="situation-description">{situation.description}</p>
                <button className={`therapy-btn ${situation.color}`} onClick={handleTherapyClick}>
                  Let's Talk
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wellness Toolkit */}
      <div className="main-features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Complete Wellness Toolkit</h2>
            <p className="features-subtitle">Everything you need for your mental health journey</p>
          </div>

          <div className="features-grid">
            <div className="feature-card amber-card">
              <div className="feature-icon-box amber-icon">
                <BookOpen className="feature-icon" />
              </div>
              <h3 className="feature-heading">Daily Journal</h3>
              <p className="feature-text">
                Reflect on your day, track your emotions, and discover patterns in your mental health journey with our guided journaling experience.
              </p>
              <button className="feature-button amber-btn" onClick={goToJournal}>
                Open Journal
              </button>
            </div>

            <div className="feature-card green-card">
  <div className="feature-icon-box green-icon">
    <UserCheck className="feature-icon" />
  </div>
  <h3 className="feature-heading">Expert Consultation</h3>
  <p className="feature-text">
    Connect with licensed therapists and mental health professionals for personalized one-on-one sessions when you need human support.
  </p>

  <a href="/expert" className="feature-button green-btn">
    Book Session
  </a>
</div>


            <div className="feature-card blue-card">
  <div className="feature-icon-box blue-icon">
    <Phone className="feature-icon" />
  </div>
  <h3 className="feature-heading">Emergency Helpline</h3>
  <p className="feature-text">
    24/7 crisis support when you need immediate help. Connect with trained professionals who are ready to assist you right away.
  </p>
  <a href="/help" className="feature-button blue-btn">
    Get Help Now
  </a>
</div>

          </div>
        </div>
      </div>

       <section className="community-section">
  <h2 className="community-main-title">Community & Moments</h2>

  <div className="postcard-grid">
    {/* Review Card */}
    <div className="visual-postcard" style={{ backgroundImage: `url('/images/review.jpg')` }}>
      <div className="overlay">
        <h3 className="postcard-heading">What Users Say</h3>
        <p className="quote">"I came here feeling overwhelmed, and left with clarity and calm."</p>
        <p className="quote">"It’s like having a private space where your emotions are safe."</p>
        <p className="author">– A Sukoon Seeker</p>
      </div>
    </div>

    {/* AI Chat Demo */}
<div className="visual-postcard" style={{ backgroundImage: `url('/images/chat.jpg')` }}>
  <div className="overlay">
    <h3 className="postcard-heading">AI Conversations</h3>
    <div className="chat-bubbles">
      <span className="bubble user right">I feel anxious about everything...</span>
      <span className="bubble ai left">Let's pause. Inhale deeply… exhale slowly. You're doing okay.</span>
      <span className="bubble user right">It’s hard to talk to people about this.</span>
      <span className="bubble ai left">This space is just for you. I’m here to listen, always.</span>
    </div>
  </div>
</div>


    {/* Upcoming Features */}
    <div className="visual-postcard" style={{ backgroundImage: `url('/images/future.jpg')` }}>
      <div className="overlay">
        <h3 className="postcard-heading">Coming Soon</h3>
        <ul className="features-list">
          <li>🎙 Voice Journals — speak your heart out</li>
          <li>📈 Mood Insights — track how you feel, daily</li>
          <li>🌍 Multilingual AI — express in your own language</li>
          <li>🔒 Private Vault — secure notes and reflections</li>
          <li>💌 Gratitude Diary — celebrate tiny joys</li>
        </ul>
      </div>
    </div>
  </div>
      </section>

      <section className="about-section">
  <div className="about-container">
    <h2 className="about-title">About Sukoon</h2>
    <p className="about-description">
      <strong>Sukoon</strong> means peace — and that’s exactly what we’re here to help you find.
      Life can be overwhelming, and it’s not always easy to express how we feel to others.
      That’s why we created Sukoon — a private, judgment-free space where your emotions are heard and validated.
    </p>
    <p className="about-description">
      Whether you're feeling anxious, alone, heartbroken, or just need someone to talk to,
      our AI companion is always here — day or night. With tools like mood journaling, guided reflections,
      and real-time conversation, Sukoon adapts to your emotional needs.
    </p>
          <p> </p>
<h3 className="about-subheading">Why We Built Sukoon..</h3>
<p className="about-description">
  In a world full of noise, we all need a little quiet. A space that listens instead of judges. 
  Sukoon is that space — built with care, powered by empathy, and always evolving with you.
</p>

    <p className="about-description">
      No sign-up. No pressure. Just you, your thoughts, and a safe space to be honest.
      Because mental well-being isn’t a luxury — it’s your right.
    </p>
  </div>
      </section>

      <section className="newsletter-section">
  <div className="newsletter-content">
    {/* 1. Soft Illustration */}
    <img src="/images/leaf-illustration.png" alt="Leaf Illustration" className="newsletter-illustration" />

    <h2 className="newsletter-title">Stay Uplifted, Stay Connected 🌿</h2>

    <p className="newsletter-subtitle">
      Get weekly wellness tips and gentle motivation delivered to your inbox. No spam. Just peace.
    </p>

    <form className="newsletter-form">
      <input type="email" placeholder="Enter your email" className="newsletter-input" />
      <button type="submit" className="newsletter-button">Subscribe</button>
    </form>

    {/* 2. Privacy Message */}
    <p className="newsletter-privacy">We’ll only send peace. No spam, no pressure. Unsubscribe anytime.</p>

    {/* 3. User Testimonial */}
    <p className="newsletter-quote">“Sukoon’s emails feel like a letter from a friend.” – Aditi, Delhi</p>
  </div>

  <div className="instagram-plug">
  <p className="insta-text">🌷 Follow us for daily calm and creativity on</p>
  <a
    href="https://www.instagram.com/yourhandle"
    target="_blank"
    rel="noopener noreferrer"
    className="insta-link"
  >
    @sukoon.space
  </a>
</div>

      </section>

    </div>
  );
};

export default HomePage;
