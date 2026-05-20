import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBJxt6aeA1PREZxWSIxL0-rhEU_rolEf24",
    authDomain: "portofolio-eeba2.firebaseapp.com",
    projectId: "portofolio-eeba2",
    storageBucket: "portofolio-eeba2.firebasestorage.app",
    messagingSenderId: "1030017351132",
    appId: "1:1030017351132:web:5e59964f345c7d9f662319",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);