/* eslint-disable jsx-a11y/alt-text */
import './App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {routes} from './routes/index'
import DefaultComponent from './component/DefaultComponent/DefaultComponent';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { isJsonString } from './until';
import { jwtDecode } from "jwt-decode";
import *  as UserService from './services/UserServices' 
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
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
  const dispatch = useDispatch()

  useEffect(() => {
    const {decoded, storageData} = handleDecoded()
    if(decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData)
    }
  },[])

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token")
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use( async (config) => {
    // Do something before request is sent
    const currentTime = new Date()
    const {decoded} = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  const handleGetDetailUser = async(id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data,access_token: token}))
  }

  return (
    <div className="App">
        <Router>
          <Routes>
            {
              routes.map((route) => {
                const Page = route.page
                const Layout = route.isShowHeader ? DefaultComponent : Fragment
                return (
                  <Route path={route.path} element={
                   <Layout>
                     <Page/>
                   </Layout>
                  } />
                )
              })
            }
          </Routes>
        </Router>
          
        <script src="https://unpkg.com/scrollreveal"></script>
        <script type="text/javascript" src="js/jsweb.js"></script>
    </div>
  );
}

export default App;
