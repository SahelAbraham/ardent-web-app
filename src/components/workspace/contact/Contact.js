import {React, useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import SideBarNav from '../../nav/SideBarNav.js'
import '../Workspace-Component.css'

export default function Contact(){
  
  return (
    <div className="flex-container">
      <div className="flex-child-left">
        <SideBarNav/>
      </div>
      <div className="flex-child-right">
        <div className='generic-search-container-description'>
          <h4>Contact</h4>
          <div style={{"marginBottom" : "5px"}}>
              <h6>
                <p>There are several ways to reach out to us:</p>
                <ul>
                  <li><p>Use the Chat at the lower right hand side of the screen.</p></li>
                  <li><p>You can also email directly at: ardent@novomorpho.com</p></li>
                </ul>                
              </h6>
          </div>
        </div>
      </div>
    </div>    
    );
};
