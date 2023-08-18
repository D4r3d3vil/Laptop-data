import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyALoqDSCm4MYzC5Vq-011Rmf-qCm1U_2fs",
  authDomain: "creativity-generation-schools.firebaseapp.com",
  projectId: "creativity-generation-schools",
  storageBucket: "creativity-generation-schools.appspot.com",
  messagingSenderId: "1036242921746",
  appId: "1:1036242921746:web:789fa24ec8e5e733766bcb",
  measurementId: "G-LQQ2NMFC9L"
};

const application = initializeApp(firebaseConfig);
const database = getFirestore(application);
const auth = getAuth(application);
export const app = application;
export const db = database;
export const oauth = auth;