import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyB2hL2A3ewaxHVBjE7m_ZW36rZpHG0R0cE",
  authDomain: "snapchat-clone-52755.firebaseapp.com",
  projectId: "snapchat-clone-52755",
  storageBucket: "snapchat-clone-52755.appspot.com",
  messagingSenderId: "769649231289",
  appId: "1:769649231289:web:b9bcc73543d2ea3e2b6268"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebase.firestore(firebaseApp)
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()
const provider = new firebase.auth.GoogleAuthProvider()
export { db, auth, storage, provider };