/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import Header from './component/Header/Header';
import Content from './component/Content/Content';
import Footer from './component/Footer/Footer';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8djLyqK3oSjVS4JaEjLmDrDyQYtwRm3E",
  authDomain: "tiemmythbeo.firebaseapp.com",
  projectId: "tiemmythbeo",
  storageBucket: "tiemmythbeo.appspot.com",
  messagingSenderId: "510735148019",
  appId: "1:510735148019:web:96a67fe123e016eab7e886",
  measurementId: "G-SP878QRXP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



function App() {
  return (
    <div className="App">
      <Header/>
      <Content/>
      <Footer/>
      <script src="https://unpkg.com/scrollreveal"></script>
      <script type="text/javascript" src="js/jsweb.js"></script>
      
    </div>
  );
}

export default App;
