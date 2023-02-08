import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
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
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
     prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
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
                    createAt
               });
          } catch (error) {
               console.log('error creating the user', error.message);
          }
     }


     return userDocRef;


     // create / set the document with the data from userAuth in my collection 

     // if user data exist
}