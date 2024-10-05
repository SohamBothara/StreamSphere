// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOcb1Cy3w9QSzGIyATXl5j7Z5A14R8dcA",
  authDomain: "mern-netflix-project-cd582.firebaseapp.com",
  projectId: "mern-netflix-project-cd582",
  storageBucket: "mern-netflix-project-cd582.appspot.com",
  messagingSenderId: "390247244706",
  appId: "1:390247244706:web:42d7fcf7e890671d2888fb",
  measurementId: "G-RY70DWM74K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
