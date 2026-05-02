import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDs96SFbPKcfwNSWb80vVMpeBU30Mfnem0",
  authDomain: "react-tic-tac-toe-7b2e0.firebaseapp.com",
  databaseURL: "https://react-tic-tac-toe-7b2e0-default-rtdb.asia-southeast1.firebasedatabase.app/", // ADD THIS (important)
  projectId: "react-tic-tac-toe-7b2e0",
  storageBucket: "react-tic-tac-toe-7b2e0.firebasestorage.app",
  messagingSenderId: "754015411796",
  appId: "1:754015411796:web:34d01d6bbd9b10284557c1"
};


const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);