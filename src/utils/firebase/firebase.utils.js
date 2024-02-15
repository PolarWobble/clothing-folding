import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
  collection,
  writeBatch,
  query,
  getDocs
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


//
//
//creating the shop collection and documents from shop-data.js
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  //creating the batch for one successful transaction to new collection
  const batch = writeBatch(db);
  //attach writes/deletes/sets etc to batch
  objectsToAdd.forEach((object) => {
    const docRef =doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('Done');
};
//
//


//current implementation that firebase uses.. subject to change
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
}



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



export const signOutUser = async () => {
  return await signOut(auth);
}


export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
}