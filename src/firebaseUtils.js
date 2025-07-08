import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase"; // make sure firebase.js exports db

export const saveChatMessage = async (userId, message) => {
  try {
    const chatRef = collection(db, "chats", userId, "sessions");
    await addDoc(chatRef, {
      text: message,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving chat:", error);
  }
};
export const saveMood = async (userId, mood) => {
  try {
    const moodRef = collection(db, "moods", userId, "entries");
    await addDoc(moodRef, {
      mood, // e.g. "Happy"
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving mood:", error);
  }
};
export const saveJournal = async (userId, entryText) => {
  try {
    const journalRef = collection(db, "journals", userId, "entries");
    await addDoc(journalRef, {
      entry: entryText,
      timestamp: Timestamp.now()
    });
  } catch (error) {
    console.error("Error saving journal:", error);
  }
};
