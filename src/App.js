import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/tabs/Home'
import About from './components/tabs/About';
import SearchWorkspace from './components/tabs/SearchWorkspace';
import Login from './components/login/Login';
import {React, useState, useEffect} from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { addRareDiseasesListResult } from "./reducer/GARDReducer"
import { setWebAppUrl } from "./reducer/NotificationReducer"

function App() {
  const dispatch = useDispatch()
  // Access the secret.
  const getWebAppUrl = () => {
    //dispatch the settiing
    let webUrl = process.env.REACT_APP_ARDENT_WEB_APP_URL
    dispatch(setWebAppUrl({REACT_APP_ARDENT_WEB_APP_URL:webUrl}))
    console.log('Value of app url:', webUrl)
    return webUrl
  }

  useEffect(() => {
    try{
      let webUrl = getWebAppUrl()
      let ARDENT_WEB_APP_URL = webUrl!=='' ? webUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
        const headers = {
          "Content-Type": "application/json",
        };      
        axios.get(ARDENT_WEB_APP_URL + '/services/gard/all_rare_diseases/', {headers})
        .then(response => {
          console.log(response.data);
          if(parseInt(response.status)==200)
              dispatch(addRareDiseasesListResult({"rare_diseases": response.data.results}))
        })
        .catch(error => {
          console.log(error);
        });
      }
      catch(error){
        console.log('An error occurred while fetching search results', error)
      }
    }, [])

  return (    
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/about' exact element={<About/>}/>
          <Route path='/workspace' exact element={<SearchWorkspace/>}/>
          <Route path='/signin' exact element={<Login/>}/>
        </Routes>
      </Router>
    </>    
  );
}

export default App;
