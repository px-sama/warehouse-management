import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDm5S1uwO8dU0pTGq18j_CWmw3XqGctoF0",
    authDomain: "warehouse-management-bc1cc.firebaseapp.com",
    projectId: "warehouse-management-bc1cc",
    storageBucket: "warehouse-management-bc1cc.appspot.com",
    messagingSenderId: "771550815353",
    appId: "1:771550815353:web:15b8198b6d032bea3f20a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }

