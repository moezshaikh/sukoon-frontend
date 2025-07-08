import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";

export const getChatMessages = async () => {
  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc")); // not 'timestamp'
    const snapshot = await getDocs(q);

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return messages;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
};




// 🔹 Read Journal Entries
export const getJournalEntries = async (userId) => {
  try {
    const journalRef = collection(db, "journals", userId, "entries");
    const q = query(journalRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }
};

// 🔹 Read Mood Entries
export const getMoodEntries = async (userId) => {
  try {
    const moodRef = collection(db, "moods", userId, "entries");
    const q = query(moodRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching mood entries:", error);
    return [];
  }
};
