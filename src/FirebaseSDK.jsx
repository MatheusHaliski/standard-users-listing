// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // ex: funcionarioslistaapp2025.web.app
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// evita inicializar duas vezes (HMR / múltiplos imports)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ AUTH
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// ✅ FIRESTORE
export const db = getFirestore(app);

export async function fetchUsersFS() {
    const snap = await getDocs(collection(db, "FSusercontrol"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
