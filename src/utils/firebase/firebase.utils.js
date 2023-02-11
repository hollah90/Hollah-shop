import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'


const firebaseConfig = {
     apiKey: "AIzaSyD_bAAZk7kKV9kvn7lcUGuM8A4y9qDBbhg",
     authDomain: "hollah-clothing.firebaseapp.com",
     projectId: "hollah-clothing",
     storageBucket: "hollah-clothing.appspot.com",
     messagingSenderId: "1063876586955",
     appId: "1:1063876586955:web:2941e5bf451e4843565a4e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googlepProvider = new GoogleAuthProvider();
googlepProvider.setCustomParameters({
     prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googlepProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googlepProvider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
     if (!userAuth) return;
     const userDocRef = doc(db, 'user', userAuth.uid);

     console.log(userDocRef)

     const userSnapshot = await getDoc(userDocRef);
     console.log(userSnapshot)
     console.log(userSnapshot.exists())

     // if username data does not exist
     if (!userSnapshot.exists()) {
          const { displayName, email } = userAuth;
          const createAt = new Date();

          try {
               await setDoc(userDocRef, {
                    displayName,
                    email,
                    createAt,
                    ...additionalInformation,
               });
          } catch (error) {
               console.log('error creating the user', error.message);
          }
     }

     return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
     if (!email || !password) return;

     return await createUserWithEmailAndPassword(auth, email, password)
}