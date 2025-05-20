// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDYYiUW0brsMw3csDFOJLmIsq-uYblRiSk",
	authDomain: "buynest-c70cf.firebaseapp.com",
	projectId: "buynest-c70cf",
	storageBucket: "buynest-c70cf.firebasestorage.app",
	messagingSenderId: "241274232021",
	appId: "1:241274232021:web:7a941742f87867903ed65c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
auth.languageCode = "en";
