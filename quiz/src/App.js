import './App.css';
import Front from "./components/front.jsx"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrIqLILTKp0znctKk8cLd35XNW15iqN4o",
  authDomain: "trivia-streak.firebaseapp.com",
  databaseURL: "https://trivia-streak-default-rtdb.firebaseio.com",
  projectId: "trivia-streak",
  storageBucket: "trivia-streak.appspot.com",
  messagingSenderId: "182329519939",
  appId: "1:182329519939:web:4efde6084847ad661389f6",
  measurementId: "G-BR37G87KTK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
      <Front />
    </div>
  );
}

export default App;