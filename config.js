import firebase from "firebase";
require("@firebase/firestore");

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDNBLI0tH0PauMwHJGMjtdfXOrsovtoLPc",
  authDomain: "storyhub-eef9a.firebaseapp.com",
  databaseURL: "https://storyhub-eef9a.firebaseio.com",
  projectId: "storyhub-eef9a",
  storageBucket: "storyhub-eef9a.appspot.com",
  messagingSenderId: "51442120730",
  appId: "1:51442120730:web:71f6bfba8280027e70f9a3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
