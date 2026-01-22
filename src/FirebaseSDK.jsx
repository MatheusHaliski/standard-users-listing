// src/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_pHu5ASG9PAhmcEwxcckXGovRWYW0Mic",
  authDomain: "funcionarioslistaapp2025.firebaseapp.com",
  projectId: "funcionarioslistaapp2025",
  storageBucket: "funcionarioslistaapp2025.firebasestorage.app",
  messagingSenderId: "457209482063",
  appId: "1:457209482063:web:a6c1bf1224842970be133a",
  measurementId: "G-HF0RYXCWZN"
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
