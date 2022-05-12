
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
const firebaseConfig = {
  // apiKey: "AIzaSyDmrQD2-J8Tul6GfivSWB2nV-Jc1lm76UA",
  // authDomain: "toy-shop-4c0fa.firebaseapp.com",
  // projectId: "toy-shop-4c0fa",
  // storageBucket: "toy-shop-4c0fa.appspot.com",
  // messagingSenderId: "556783445774",
  // appId: "1:556783445774:web:31535ed3e3d84d2d64995f",
  // measurementId: "G-M61ZMC84BW",

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
