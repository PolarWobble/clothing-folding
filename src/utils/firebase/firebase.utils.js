import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDXXaHjOvvx-zGeRYzO1yUdpIaNb0U9pBw",
    authDomain: "clothing-folding-db.firebaseapp.com",
    projectId: "clothing-folding-db",
    storageBucket: "clothing-folding-db.appspot.com",
    messagingSenderId: "428183256803",
    appId: "1:428183256803:web:e9e845495f47ed132f4fd6"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

//setting object parameters
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }


  //if user data does not exist
  
  //if user data exists
  //return userDocRef
  return userDocRef;

};