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
import processed_mock_resp from './mockData/ctgardlist.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const CustomToastWithLink = () => (
  <div style={{textAlign:"center"}}>    
    <Link to="https://ai.google.dev/competition/projects/ardent" target="_blank">Vote for Ardent in Gemini API Competition</Link>
  </div>
);

function App() {
  const dispatch = useDispatch()
  // Access the secret.
  const getWebAppUrl = () => {
    //dispatch the settiing
    let webUrl = process.env.REACT_APP_ARDENT_WEB_APP_URL
    dispatch(setWebAppUrl({ardent_web_app_url:webUrl}))
    // console.log('Value of app url:', webUrl)
    return webUrl
  }

  useEffect(() => {
    toast(<CustomToastWithLink/>, {
      position: "bottom-center",
      autoClose: 50000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

    try{
      let webUrl = getWebAppUrl()
      let mockDataUse = process.env.REACT_APP_USE_MOCK_DATA
      let ARDENT_WEB_APP_URL = webUrl!=='' ? webUrl : process.env.REACT_APP_ARDENT_WEB_APP_URL
        const headers = {
          "Content-Type": "application/json",
        };

        if (mockDataUse==='true'){
          let transformed_gard_list = processed_mock_resp.map(entry => {
            return {"label": entry[1], "value": entry[1]}
          })
          dispatch(addRareDiseasesListResult({"rare_diseases": transformed_gard_list}))
        }
        else{
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
      }
      catch(error){
        console.log('An error occurred while fetching search results', error)
      }
    }, [])

  return (    
    <>
      <Router>
        <ToastContainer
          position="bottom-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          // transition: Bounce,
          />        
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
