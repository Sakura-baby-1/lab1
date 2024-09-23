import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAS_pWtL8yukMIyqVyilYzQpmGSb1RnTBY",
  authDomain: "lab1-e1556.firebaseapp.com",
  databaseURL: "https://lab1-e1556-default-rtdb.firebaseio.com",
  projectId: "lab1-e1556",
  storageBucket: "lab1-e1556.appspot.com",
  messagingSenderId: "827068223459",
  appId: "1:827068223459:web:6b6c65a408fade31fc9ad6",
  measurementId: "G-0HY8QG2Y7K",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
