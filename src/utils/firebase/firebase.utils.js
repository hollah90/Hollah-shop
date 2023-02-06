import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';

const firebaseConfig = {
     apiKey: "AIzaSyD0GchTzZvTwbMiWf3ojnZKF1tDorVEvYM",
     authDomain: "hollah-clothing-db.firebaseapp.com",
     projectId: "hollah-clothing-db",
     storageBucket: "hollah-clothing-db.appspot.com",
     messagingSenderId: "885814519658",
     appId: "1:885814519658:web:74a938997181c83101e713"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
     prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);