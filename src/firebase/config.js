import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-B5UiemRIapnUZEMjKAmqhOsVTl7kmYw",
  authDomain: "amar-dokan-5629d.firebaseapp.com",
  projectId: "amar-dokan-5629d",
  storageBucket: "amar-dokan-5629d.appspot.com", // ✅ fixed!
  messagingSenderId: "964853111323",
  appId: "1:964853111323:web:a82834976de222097fb6be",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
