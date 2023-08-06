// from firebase web
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// add firebase/auth
import { getAuth } from "firebase/auth"

// add firebase/firestore
import { getFirestore } from "firebase/firestore";

// from firebase web
const firebaseConfig = {
    apiKey: "AIzaSyAjwPYyykc1RQDhU8qBANOwyD0S5OyH0TY",
    authDomain: "react-firebase-fb6cf.firebaseapp.com",
    projectId: "react-firebase-fb6cf",
    storageBucket: "react-firebase-fb6cf.appspot.com",
    messagingSenderId: "538198369325",
    appId: "1:538198369325:web:98e6e61c2b7bf5817844a4",
    measurementId: "G-70V57NZTS5"
};

// from firebase web
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//add export
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;