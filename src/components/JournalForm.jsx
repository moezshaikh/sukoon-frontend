import React, { useState } from 'react';

const JournalForm = ({ onSave }) => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('neutral');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    const newEntry = {
      id: Date.now(),
      text: entry,
      mood,
      date: new Date().toLocaleString(),
    };

    onSave(newEntry);
    setEntry('');
    setMood('neutral');
  };

  return (
    <form className="journal-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="Write what’s on your mind..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="happy">😊 Happy</option>
        <option value="sad">😢 Sad</option>
        <option value="anxious">😰 Anxious</option>
        <option value="neutral">😐 Neutral</option>
      </select>
      <button type="submit">Save Entry</button>
    </form>
  );
};

export default JournalForm;
