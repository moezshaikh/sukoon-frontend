import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { saveJournal, saveMood } from '../firebaseSave'; // Adjust path as needed
import { getJournalEntries, getMoodEntries } from '../firebaseRead';

import LoginPromptModal from '../components/popup';
import Calendar from 'react-calendar';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import 'react-calendar/dist/Calendar.css';
import '../style/Journal.css';

const affirmations = [
  "You are enough, just as you are.",
  "This too shall pass.",
  "Today is a new beginning.",
  "Be proud of how far you’ve come.",
];

const moodColors = {
  Happy: '#34d399',
  Sad: '#60a5fa',
  Anxious: '#fbbf24',
  Angry: '#f87171',
  Neutral: '#a78bfa'
};

const JournalPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [prompt] = useState('What made you smile today?');
  const [goal, setGoal] = useState('');
  const [mood, setMood] = useState('Happy');
  const [calendarValue, setCalendarValue] = useState(new Date());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setShowModal(true);
      } else {
        setUserId(user.uid); // ✅ Set the current user's ID
      }
    });

    const stored = JSON.parse(localStorage.getItem('journalEntries')) || [];
    setEntries(stored);

    return () => unsubscribe();
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  const saveEntry = async () => {
    const entry = {
      date: new Date().toISOString(),
      text,
      goal,
      mood,
      pinned: false
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
    setText('');
    setGoal('');

    // ✅ Save to Firebase
    const user = auth.currentUser;
  if (user) {
    await saveJournal(user.uid, text);
    await saveMood(user.uid, mood);
  }

  setText('');
  setGoal('');
};

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to delete all journal entries?")) {
      setEntries([]);
      localStorage.removeItem('journalEntries');
    }
  };

  const pinEntry = (index) => {
    const updated = entries.map((e, i) => ({ ...e, pinned: i === index }));
    setEntries(updated);
    localStorage.setItem('journalEntries', JSON.stringify(updated));
  };

  const moodData = Object.entries(
    entries.reduce((acc, e) => {
      acc[e.mood] = (acc[e.mood] || 0) + 1;
      return acc;
    }, {})
  ).map(([mood, value]) => ({ name: mood, value }));

  return (
    <>
      {showModal && (
        <LoginPromptModal
          onLogin={handleLoginRedirect}
          onClose={() => setShowModal(false)}
        />
      )}

      {!showModal && (
        <div className="journal-container">
          <div className="journal-page">
            <h2>🌙 Sukoon Journal</h2>
            <div className="affirmation">🕊️ {affirmations[Math.floor(Math.random() * affirmations.length)]}</div>

            {/* Prompt & Form */}
            <div className="centered-form">
              <label className="prompt-label">Reflection Prompt:</label>
              <p className="prompt-text">{prompt}</p>

              <textarea
                rows="4"
                placeholder="Start journaling..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <input
                type="text"
                placeholder="🎯 Goal for today"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />

              <select value={mood} onChange={(e) => setMood(e.target.value)}>
                {Object.keys(moodColors).map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <button onClick={saveEntry}>💾 Save Entry</button>
            </div>

            {/* Calendar + Breathing */}
            <div className="calendar-breathing-container">
              <div className="calendar-widget">
                <Calendar onChange={setCalendarValue} value={calendarValue} />
              </div>
              <div className="breathing-widget">
                <div className="circle"></div>
                <p>Inhale… Exhale… Sukoon</p>
              </div>
            </div>

            {/* Mood Chart */}
            <div className="analytics-section">
              <h3>🧠 Mood Insights</h3>
              <div className="chart-card">
                <PieChart width={320} height={240}>
                  <Pie
                    data={moodData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {moodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={moodColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
                <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                  Tip: Take a walk, write a dua, or listen to calming Quran to uplift your mood 🌿
                </p>
              </div>
            </div>

            {/* Entries List */}
            <h3>📚 Journal Entries</h3>
            <div className="journal-list">
              {entries.sort((a, b) => b.pinned - a.pinned).map((entry, index) => (
                <div key={index} className="journal-card">
                  <div className="journal-date">{new Date(entry.date).toLocaleString()}</div>
                  <div className="journal-text">{entry.text}</div>
                  <div className="journal-mood">🪻 Mood: {entry.mood}</div>
                  <div className="journal-goal">🎯 {entry.goal}</div>
                  <button onClick={() => pinEntry(index)}>{entry.pinned ? '📌 Unpin' : '📌 Pin'}</button>
                </div>
              ))}
            </div>

            {/* Clear All */}
            {entries.length > 0 && (
              <button className="clear-btn" onClick={clearHistory}>🧹 Clear All Entries</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default JournalPage;
