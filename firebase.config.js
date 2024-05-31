import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig) //initializeApp({ projectId: 'test',appId: 'test',apiKey: 'test', });

// Jag måste göra initializeApp med random props för att få testet att funka, 
// annars för jag api-key/invalid.
// Kommentera ut initializeApp med random props så funkar testet.

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };