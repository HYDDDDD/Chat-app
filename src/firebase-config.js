import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn0DaBKL0O0wIZdof54rpO4exjFbKMz3Y",
  authDomain: "chatapp-ec776.firebaseapp.com",
  projectId: "chatapp-ec776",
  storageBucket: "chatapp-ec776.appspot.com",
  messagingSenderId: "674161378433",
  appId: "1:674161378433:web:8261a06bd20bec40b8b980"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);