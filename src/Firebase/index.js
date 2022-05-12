
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  

  apiKey: "AIzaSyAvvrJ0ffei75TPIMsZ64sa4nExMi1yFSM",
  authDomain: "toy-exchange-364c6.firebaseapp.com",
  projectId: "toy-exchange-364c6",
  storageBucket: "toy-exchange-364c6.appspot.com",
  messagingSenderId: "658603248753",
  appId: "1:658603248753:web:5764ab21e8038739ce5fd0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const store = firebaseApp.storage();

export { auth, db, store };
