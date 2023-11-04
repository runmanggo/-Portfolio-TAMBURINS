import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl157V4X_7-Y8HAw27vL8ZEnrX1Bmzau4",
  authDomain: "portfolio-tamburins.firebaseapp.com",
  projectId: "portfolio-tamburins",
  storageBucket: "portfolio-tamburins.appspot.com",
  messagingSenderId: "221453486945",
  appId: "1:221453486945:web:4dc4b844bc4d1b1324d320",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
