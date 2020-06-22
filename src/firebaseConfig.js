// src/firebaseConfig.js
import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDLcDB6HaS0rMpUwqMnHBIYTKj5bETz_KE",
    authDomain: "testvizdummy21.firebaseapp.com",
    databaseURL: "https://testvizdummy21.firebaseio.com",
    projectId: "testvizdummy21",
    storageBucket: "testvizdummy21.appspot.com",
    messagingSenderId: "238392744076",
    appId: "1:238392744076:web:989eb553368aebaef6c3a9"
  };

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);