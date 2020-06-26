// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeCpUe_Zk3zm_mAwJxSBa8uWyv2G52aOQ",
    authDomain: "lodget-2249f.firebaseapp.com",
    databaseURL: "https://lodget-2249f.firebaseio.com",
    projectId: "lodget-2249f",
    storageBucket: "lodget-2249f.appspot.com",
    messagingSenderId: "486719168995",
    appId: "1:486719168995:web:e0f04f209e284cce5900d6",
    measurementId: "G-9S73CQ0EDW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//make auth and firestore ref
const auth = firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();