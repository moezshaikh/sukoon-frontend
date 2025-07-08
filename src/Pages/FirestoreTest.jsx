import React from "react";
import { saveChatMessage, saveMood, saveJournal } from "../firebaseUtils";

const FirestoreTest = () => {
  const userId = "demoUser123"; // Replace with actual user ID if you have auth

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧪 Firestore Test</h2>
      <button onClick={() => saveChatMessage(userId, "Hello from Sukoon")}>
        Save Chat Message
      </button>
      <br /><br />
      <button onClick={() => saveMood(userId, "Relaxed")}>
        Save Mood
      </button>
      <br /><br />
      <button onClick={() => saveJournal(userId, "Today was a calm day.")}>
        Save Journal
      </button>
    </div>
  );
};

export default FirestoreTest;
