import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Heart, ArrowDown } from 'lucide-react';
import '../style/chat.css';
import { db, auth } from '../firebase';
import LoginPromptModal from '../components/popup';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getChatMessages } from '../firebaseRead';

const SukoonChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm Sukoon, your AI companion for peace and wellness. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mode, setMode] = useState('therapist');
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [allMessages, setAllMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // 🔐 Auth check
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) setShowModal(true);
    });
    return () => unsubscribe();
  }, []);

  // 🔄 Load messages from Firestore
  useEffect(() => {
    const loadChats = async () => {
      const msgs = await getChatMessages(auth.currentUser?.uid);
      setAllMessages(msgs);
    };
    if (auth.currentUser?.uid) loadChats();
  }, [auth.currentUser]);

  const filteredMessages = selectedChatId
    ? allMessages.filter(msg => msg.id === selectedChatId)
    : allMessages.slice(-10);

  // 📜 Scroll behavior
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;
    setShowScrollButton(!isNearBottom);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 💾 Save to Firestore
  const saveMessageToFirestore = async (text, sender) => {
    try {
      await addDoc(collection(db, 'messages'), {
        text,
        sender,
        createdAt: Timestamp.now(),
        userId: auth.currentUser?.uid || ""
      });
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  // ✉️ Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    saveMessageToFirestore(userMessage.text, 'user');

    const systemPrompt = getSystemPrompt(mode);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        userMessage: inputMessage,
        systemPrompt: systemPrompt
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      saveMessageToFirestore(botMessage.text, 'bot');
    } catch (error) {
      console.error("Error:", error.message);
      const errorMessage = {
        id: Date.now() + 2,
        sender: 'bot',
        text: "Oops! Something went wrong. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
      saveMessageToFirestore(errorMessage.text, 'bot');
    } finally {
      setIsTyping(false);
    }
  };

  // 🧠 Prompt based on mode
  const getSystemPrompt = (selectedMode) => {
    switch (selectedMode) {
      case 'therapist':
        return "You are Sukoon, a compassionate AI therapist. Respond with empathy, calmness, and kindness. Keep responses short, thoughtful, and emotionally supportive. Use open-ended questions. Avoid giving direct advice or diagnosing.";
      case 'motivator':
        return "You are Sukoon, a motivating coach. Respond with positivity and encouragement. Use empowering language. Keep responses short but energetic. Inspire the user to take small steps forward.";
      case 'listener':
        return "You are Sukoon, a silent and gentle listener. Acknowledge feelings with simple affirmations. Be patient and let the user express. Don’t give advice — just reflect emotions back kindly.";
      default:
        return "";
    }
  };

  // ✅ "New Chat" handler (reset local UI)
  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hey there! I'm Sukoon, your AI companion for peace and wellness. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setSelectedChatId(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-layout">
      

      <section className="chat">
        {showModal && (
          <LoginPromptModal
            onLogin={() => window.location.href = '/login'}
            onClose={() => setShowModal(false)}
          />
        )}

        <div className="sukoon-chat-container">
          <div className="sukoon-container">
            <div className="sukoon-header">
              <div className="sukoon-header-content">
                <div className="sukoon-header-text">
                  <h1 className="sukoon-title">Sukoon</h1>
                </div>
              </div>
            </div>

            <div
              className="sukoon-messages"
              ref={messagesContainerRef}
              onScroll={handleScroll}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`sukoon-message ${message.sender === 'user' ? 'sukoon-user-message' : 'sukoon-bot-message'}`}
                >
                  <div className="sukoon-message-avatar">
                    {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className="sukoon-message-content">
                    <div className="sukoon-message-bubble">{message.text}</div>
                    <div className="sukoon-message-time">{message.timestamp}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="sukoon-message sukoon-bot-message">
                  <div className="sukoon-message-avatar"><Bot size={20} /></div>
                  <div className="sukoon-message-content">
                    <div className="sukoon-message-bubble sukoon-typing">
                      <div className="sukoon-typing-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {showScrollButton && (
              <button className="scroll-to-bottom-btn" onClick={scrollToBottom}>
                <ArrowDown size={18} /> Scroll to Bottom
              </button>
            )}

            <div className="sukoon-input-area">
              <div className="sukoon-input-container">
                <div className="mode-selector">
                  <button onClick={() => setShowModeDropdown(!showModeDropdown)} className="mode-button">
                    +
                  </button>

                  {showModeDropdown && (
                    <div className="mode-dropdown">
                      <div
                        className={`mode-option ${mode === 'default' ? 'active' : ''}`}
                        onClick={() => { setMode('default'); setShowModeDropdown(false); }}
                      >
                        🆓 Daily Chat (Free)
                      </div>
                      <div className="mode-label">Premium Modes</div>
                      <div
                        className={`mode-option ${mode === 'therapist' ? 'active' : ''}`}
                        onClick={() => { setMode('therapist'); setShowModeDropdown(false); }}
                      >
                        🧘 Therapist
                      </div>
                      <div
                        className={`mode-option ${mode === 'motivator' ? 'active' : ''}`}
                        onClick={() => { setMode('motivator'); setShowModeDropdown(false); }}
                      >
                        💪 Motivator
                      </div>
                      <div
                        className={`mode-option ${mode === 'listener' ? 'active' : ''}`}
                        onClick={() => { setMode('listener'); setShowModeDropdown(false); }}
                      >
                        👂 Listener
                      </div>
                    </div>
                  )}
                </div>

                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what's on your mind..."
                  className="sukoon-input"
                  rows="1"
                />
                <button
                  onClick={handleSendMessage}
                  className="sukoon-send-button"
                  disabled={!inputMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="sukoon-footer">
                <span>Made with <Heart size={14} className="sukoon-heart" /> for your peace of mind</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SukoonChatbot;
