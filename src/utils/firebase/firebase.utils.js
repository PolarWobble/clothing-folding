import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
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

const googleProvider = new GoogleAuthProvider();

//setting object parameters
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {} //default is empty object
  ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data does not exist

  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch(error){
      console.log('error creating the user', error.message);
    }
  }


  //if user data exists
  //return userDocRef
  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}




export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}