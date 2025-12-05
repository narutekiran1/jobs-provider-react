import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsow7xQ_1e6hfMPN1mfRGx3OeEdKEmAM8",
  authDomain: "jobsprovider-b6914.firebaseapp.com",
  projectId: "jobsprovider-b6914",
  storageBucket: "jobsprovider-b6914.appspot.com", // fixed
  messagingSenderId: "1038531452654",
  appId: "1:1038531452654:web:9f4bff74c738d7a1269dff",
  measurementId: "G-Q0QC3X6LWV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
