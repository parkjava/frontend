// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9-p59OGRzBMttGzCNMCqkUwdXaAbSYXI",
    authDomain: "parkjavastorage.firebaseapp.com",
    projectId: "parkjavastorage",
    storageBucket: "parkjavastorage.appspot.com",
    messagingSenderId: "321744323392",
    appId: "1:321744323392:web:12aa090ac22e360d52b0a5",
    measurementId: "G-CN8ZPGHERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
