import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// Adiciona este log logo no início do ficheiro
//console.log("TESTE ENV:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY); 

// 1. Configuração (usando as variáveis do .env.local que criaste)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

//console.log("Minha chave API:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// 2. Inicialização (Prevenindo erro de duplicados no Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 3. Exportação das instâncias
export const auth = getAuth(app);
export const db = getFirestore(app);

// 4. Funções Utilitárias (Exportadas para usares nas tuas páginas)
export const cadastrarUsuario = async (email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logout = () => signOut(auth);



