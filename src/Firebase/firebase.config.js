// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYgSU9843wU-TH66B5vesLifWaDHdcik8",
  authDomain: "job-task-cc93b.firebaseapp.com",
  projectId: "job-task-cc93b",
  storageBucket: "job-task-cc93b.appspot.com",
  messagingSenderId: "171892004700",
  appId: "1:171892004700:web:d26552236a218908dc1399",
  measurementId: "G-5XLPLYHR9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth