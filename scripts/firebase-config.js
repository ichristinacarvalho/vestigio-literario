// Importa as funções principais do SDK do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-analytics.js";

// IMPORTAÇÃO DO FIRESTORE
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAaXIJQ4E-f7souxS0Hj1wfeVsSn54jixA",
    authDomain: "vestigioliterario-76173.firebaseapp.com",
    projectId: "vestigioliterario-76173",
    storageBucket: "vestigioliterario-76173.firebasestorage.app",
    messagingSenderId: "802535744847",
    appId: "1:802535744847:web:6ec409a88fa8bd8488513a",
    measurementId: "G-PH0DVQKBN5"
};

// Inicializa o Firebase e o Analytics
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializamos o banco de dados
export const db = getFirestore(app);