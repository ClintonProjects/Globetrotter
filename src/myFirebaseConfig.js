import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA_xrOd98aDD5JVnpTZtBT8jhG8xPZng7o",
    authDomain: "globetrotterpoint-f626a.firebaseapp.com",
    databaseURL: "https://globetrotterpoint-f626a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "globetrotterpoint-f626a",
    storageBucket: "globetrotterpoint-f626a.appspot.com",
    messagingSenderId: "762837169375",
    appId: "1:762837169375:web:be51132e46233221c2256a",
    measurementId: "G-TCHH4GSHDQ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;