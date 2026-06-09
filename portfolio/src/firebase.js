import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBJxt6aeA1PREZxWSIxL0-rhEU_rolEf24",
    authDomain: "portofolio-eeba2.firebaseapp.com",
    databaseURL: "https://portofolio-eeba2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portofolio-eeba2",
    storageBucket: "portofolio-eeba2.firebasestorage.app",
    messagingSenderId: "1030017351132",
    appId: "1:1030017351132:web:5e59964f345c7d9f662319",
    measurementId: "G-ZVBHNFQ2C3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const analytics = getAnalytics(app);
export { logEvent };
