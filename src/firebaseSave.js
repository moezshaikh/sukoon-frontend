// src/firebaseSave.js
import { db } from "./firebase"; // path must be correct
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const saveJournal = async (userId, text) => {
  try {
    await addDoc(collection(db, "journalEntries"), {
      userId,
      text,
      timestamp: Timestamp.now(),
    });
    console.log("✅ Journal saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving journal:", error);
  }
};

export const saveMood = async (userId, mood) => {
  try {
    await addDoc(collection(db, "moodLogs"), {
      userId,
      mood,
      timestamp: Timestamp.now(),
    });
    console.log("✅ Mood saved to Firestore");
  } catch (error) {
    console.error("❌ Error saving mood:", error);
  }
};
