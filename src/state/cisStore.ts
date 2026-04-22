import { create } from 'zustand';
import { doc, getDoc, updateDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../core/firebase';

export const useCIS = create<any>((set, get) => ({
  xp: 0,
  level: 1,
  isSyncing: false,

  // Initialize and sync with Firestore
  initSync: (uid: string) => {
    const userRef = doc(db, 'users', uid);
    
    // Real-time listener for stats
    const unsub = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        set({ xp: data.xp || 0, level: data.level || 1 });
      } else {
        // Create initial entry if missing
        setDoc(userRef, { xp: 0, level: 1, createdAt: serverTimestamp() });
      }
    });
    
    return unsub;
  },

  addXP: async (uid: string) => {
    if (!uid) return;
    const userRef = doc(db, 'users', uid);
    const newXP = get().xp + 50;
    const newLevel = Math.floor(newXP / 1000) + 1;

    set({ xp: newXP, level: newLevel }); // Optimistic update

    try {
      await updateDoc(userRef, {
        xp: newXP,
        level: newLevel,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      console.error("XP Sync Failed:", e);
    }
  }
}));
