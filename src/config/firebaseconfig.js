import firebase from "firebase"
import "firebase/storage"
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyB5bYWm1ebEeCZfcWHt1Hig_7nosLmEccs",
  authDomain: "authenticationoriginal.firebaseapp.com",
  projectId: "authenticationoriginal",
  storageBucket: "authenticationoriginal.appspot.com",
  messagingSenderId: "612155162589",
  appId: "1:612155162589:web:e5ed2b147646be9b540034"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase