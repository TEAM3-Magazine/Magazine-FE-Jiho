import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

export const apiKey = "AIzaSyDIqPxO7CjBIbNeh3qXyf1Dbxjjsgq9FbE";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "duckstargram.firebaseapp.com",
  projectId: "duckstargram",
  storageBucket: "duckstargram.appspot.com",
  messagingSenderId: "807587994376",
  appId: "1:807587994376:web:1bc09ffa1916fbc4c6aabd",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
