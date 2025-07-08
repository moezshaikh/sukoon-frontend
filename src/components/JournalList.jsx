import React from 'react';

const JournalList = ({ entries }) => {
  if (!entries.length) return <p>No entries yet. Start journaling 📝</p>;

  return (
    <div className="journal-list">
      {entries.map((entry) => (
        <div className="journal-card" key={entry.id}>
          <div className="journal-date">{entry.date}</div>
          <div className="journal-mood">{entry.mood}</div>
          <p className="journal-text">{entry.text}</p>
        </div>
      ))}
    </div>
  );
};

export default JournalList;
