// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDAVX05L6MzOqr85Bp16ucGipPpsf300Hw",
    authDomain: "whatsapp-84ad0.firebaseapp.com",
    projectId: "whatsapp-84ad0",
    storageBucket: "whatsapp-84ad0.appspot.com",
    messagingSenderId: "505516522842",
    appId: "1:505516522842:web:037f1bb2de3403b6d6c763",
    measurementId: "G-89Z5857N5P"
  };

  const app = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  const db = app.firestore();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  export { auth, googleProvider}

  export default db;