import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// 설정값
const firebaseConfig = {
  apiKey: "AIzaSyBr6p98Ue3GtobKnQIJuDeurxbjsWc_qk8",
  authDomain: "my-tamburins.firebaseapp.com",
  projectId: "my-tamburins",
  storageBucket: "my-tamburins.appspot.com",
  messagingSenderId: "840295078529",
  appId: "1:840295078529:web:4d9cfc3adbd1aee1420b80",
};

//Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
